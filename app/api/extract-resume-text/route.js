import { NextResponse } from "next/server";
import zlib from "zlib";
import { promisify } from "util";

const inflate = promisify(zlib.inflate);
const inflateRaw = promisify(zlib.inflateRaw);

// POST /api/extract-resume-text
// Extracts text from PDF (including FlateDecode compressed streams) or TXT files.
// Uses Node.js built-in zlib — no external dependencies.

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = (file.name || "").toLowerCase();
    const mimeType = file.type || "";
    const isPDF = mimeType === "application/pdf" || fileName.endsWith(".pdf");

    let text = "";

    if (!isPDF) {
      text = buffer.toString("utf-8").trim();
    } else {
      text = await extractPDFText(buffer);
    }

    // Normalise whitespace
    text = text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

    if (text.length < 80) {
      return NextResponse.json(
        {
          error:
            "Could not extract readable text from this PDF. " +
            "The file may be a scanned image or password-protected. " +
            "Try saving your resume as a .txt file and uploading that instead.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text, charCount: text.length });
  } catch (err) {
    console.error("[extract-resume-text] Error:", err);
    return NextResponse.json(
      { error: `Failed to process file: ${err.message}` },
      { status: 500 }
    );
  }
}

// ── Main PDF extractor ────────────────────────────────────────────────────────
async function extractPDFText(buffer) {
  const raw = buffer.toString("binary"); // preserve all byte values
  const parts = [];

  // ── Step 1: Decompress FlateDecode streams (the main reason garbled) ─────
  // Find all "stream ... endstream" blocks and try to inflate them
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let sm;
  while ((sm = streamRegex.exec(raw)) !== null) {
    const streamData = Buffer.from(sm[1], "binary");
    // Only try to decompress if stream looks compressed (not already text)
    const readable = /[a-zA-Z]{5,}/.test(sm[1].slice(0, 200));
    if (!readable) {
      const decompressed = await tryDecompress(streamData);
      if (decompressed) {
        const decodedText = extractTextOperators(decompressed.toString("latin1"));
        if (decodedText.trim().length > 10) {
          parts.push(decodedText);
        }
      }
    } else {
      // Stream is already text (not compressed)
      const decodedText = extractTextOperators(sm[1]);
      if (decodedText.trim().length > 10) {
        parts.push(decodedText);
      }
    }
  }

  // ── Step 2: Also scan the raw PDF for uncompressed text operators ─────────
  const rawText = extractTextOperators(raw);
  if (rawText.trim().length > 20) {
    parts.push(rawText);
  }

  // ── Step 3: Also extract any hex-encoded strings <hex> ───────────────────
  const hexText = extractHexStrings(raw);
  if (hexText.trim().length > 20) {
    parts.push(hexText);
  }

  // Deduplicate and join
  const combined = parts.join("\n");
  return deduplicateLines(combined);
}

// ── Try inflate (zlib) then inflateRaw (deflate) ─────────────────────────────
async function tryDecompress(buf) {
  // zlib compressed (has zlib header 0x78 0x9C / 0x78 0xDA)
  try {
    return await inflate(buf);
  } catch (_) {}
  // raw deflate (no header)
  try {
    return await inflateRaw(buf);
  } catch (_) {}
  return null;
}

// ── Extract text from PDF content stream operators ────────────────────────────
// Handles: (string)Tj, [(array)]TJ, BT/ET blocks
function extractTextOperators(content) {
  const parts = [];

  // Pattern 1: (string) Tj / ' / "
  const tjPat = /\(([^)\\]{0,500}(?:\\.[^)\\]{0,500})*)\)\s*(?:Tj|'|")/g;
  let m;
  while ((m = tjPat.exec(content)) !== null) {
    const s = decodePDFString(m[1]);
    if (isPrintable(s)) parts.push(s);
  }

  // Pattern 2: [(string) gap (string) ...] TJ
  const tjArrayPat = /\[([^\]]{0,3000})\]\s*TJ/g;
  while ((m = tjArrayPat.exec(content)) !== null) {
    const inner = m[1];
    const strPat = /\(([^)\\]{0,400}(?:\\.[^)\\]{0,400})*)\)/g;
    let sm2;
    const lineParts = [];
    while ((sm2 = strPat.exec(inner)) !== null) {
      const s = decodePDFString(sm2[1]);
      if (isPrintable(s)) lineParts.push(s);
    }
    if (lineParts.length > 0) parts.push(lineParts.join(""));
  }

  return parts.join(" ");
}

// ── Extract hex-encoded strings <4E616D65> ───────────────────────────────────
function extractHexStrings(raw) {
  const parts = [];
  const hexPat = /<([0-9a-fA-F]{4,})>/g;
  let m;
  while ((m = hexPat.exec(raw)) !== null) {
    try {
      const hex = m[1];
      // Interpret as UTF-16BE (most common in PDFs for non-ASCII)
      if (hex.length % 4 === 0 && hex.slice(0, 4) === "FEFF") {
        // UTF-16BE BOM
        const decoded = Buffer.from(hex, "hex").toString("utf16le");
        if (isPrintable(decoded)) parts.push(decoded);
      } else if (hex.length % 2 === 0) {
        const decoded = Buffer.from(hex, "hex").toString("latin1");
        if (isPrintable(decoded) && /[a-zA-Z]{2,}/.test(decoded)) {
          parts.push(decoded);
        }
      }
    } catch (_) {}
  }
  return parts.join(" ");
}

function decodePDFString(s) {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\(\d{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
}

function isPrintable(s) {
  return typeof s === "string" && s.trim().length > 1 && /[a-zA-Z]{2,}/.test(s);
}

function deduplicateLines(text) {
  const seen = new Set();
  return text
    .split("\n")
    .filter(line => {
      const t = line.trim();
      if (t.length < 2) return false;
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    })
    .join("\n");
}
