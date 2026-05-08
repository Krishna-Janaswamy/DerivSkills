'use client';

import React, { useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack
} from "@codesandbox/sandpack-react";

// Helper to build a nested tree structure from flat file paths
function buildFileTree(files) {
  const tree = {};
  files.forEach(path => {
    const parts = path.split('/').filter(Boolean);
    let current = tree;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        current[part] = path; // It's a file
      } else {
        current[part] = current[part] || {}; // It's a folder
        current = current[part];
      }
    });
  });
  return tree;
}

const FileNode = ({ name, node, depth = 0, pathPrefix = '' }) => {
  const { sandpack } = useSandpack();
  const isFile = typeof node === 'string';
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(name);

  if (isFile) {
    const isActive = sandpack.activeFile === node;
    const isEssential = ['/src/App.js', '/src/index.js', '/public/index.html', '/package.json'].includes(node);

    const handleRenameFileClick = (e) => {
      e.stopPropagation();
      setIsRenaming(true);
      setRenameValue(name);
    };

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: `6px 5px 6px ${depth * 15 + 5}px`,
          background: isActive ? '#2a2a2a' : (isHovered ? '#1e1e1e' : 'transparent'),
          cursor: 'pointer',
          borderRadius: '4px'
        }}
        onClick={() => sandpack.openFile(node)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', flex: 1 }}>
          <span style={{ fontSize: '12px' }}>{name.endsWith('.js') || name.endsWith('.jsx') ? '⚛️' : name.endsWith('.css') ? '🎨' : '📄'}</span>
          {isRenaming ? (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsRenaming(false);
                if (!renameValue || renameValue === name) return;
                const oldPath = node;
                const dirPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1);
                const newPath = dirPath + renameValue;
                const content = sandpack.files[oldPath].code;
                sandpack.updateFile(newPath, content);
                sandpack.deleteFile(oldPath);
                sandpack.openFile(newPath);
              }}
              style={{ flex: 1, margin: 0 }}
            >
              <input 
                autoFocus
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onBlur={() => setIsRenaming(false)}
                style={{ width: '100%', padding: '0 2px', background: '#222', border: '1px solid #3b82f6', color: 'white', fontSize: '13px', fontFamily: 'monospace', outline: 'none' }}
              />
            </form>
          ) : (
            <span style={{ fontSize: '13px', color: isActive ? '#6ee7b7' : '#e2e8f0', fontFamily: 'monospace', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</span>
          )}
        </div>
        {(isHovered || isActive) && !isEssential && !isRenaming && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={handleRenameFileClick}
              style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '13px', padding: '0 2px' }}
              title="Rename File"
            >
              ✎
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete ${name}?`)) sandpack.deleteFile(node);
              }}
              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '0 2px', lineHeight: '10px' }}
              title="Delete File"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  }

  const handleAddFileClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
    setIsAddingFile(true);
  };

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: `6px 5px 6px ${depth * 15 + 5}px`,
          background: isHovered ? '#1e1e1e' : 'transparent',
          cursor: 'pointer', borderRadius: '4px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888', fontWeight: 'bold' }}>
          <span>{isOpen ? '📂' : '📁'}</span>
          <span>{name}</span>
        </div>
        {isHovered && (
          <button
            onClick={handleAddFileClick}
            style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', fontSize: '14px', padding: '0 6px', fontWeight: 'bold' }}
            title={`Add file to ${name}`}
          >
            +
          </button>
        )}
      </div>
      {isOpen && isAddingFile && (
        <div style={{ padding: `4px 5px 4px ${depth * 15 + 20}px` }}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!newFileName) return setIsAddingFile(false);
              let fileName = newFileName.includes('.') ? newFileName : newFileName + '.js';
              const fullPath = `/${pathPrefix}${name}/${fileName}`.replace('//', '/');
              sandpack.updateFile(fullPath, fileName.endsWith('.js') || fileName.endsWith('.jsx') ? `export default function ${fileName.replace(/[^a-zA-Z]/g, '')}() {\n  return <div>New Component</div>;\n}` : '');
              sandpack.openFile(fullPath);
              setIsAddingFile(false);
              setNewFileName('');
            }}
          >
            <input 
              autoFocus
              value={newFileName}
              onChange={e => setNewFileName(e.target.value)}
              onBlur={() => { if (!newFileName) setIsAddingFile(false); }}
              placeholder="filename.js"
              style={{ width: '100%', padding: '2px 4px', background: '#222', border: '1px solid #3b82f6', color: 'white', fontSize: '12px', outline: 'none', borderRadius: '3px' }}
            />
          </form>
        </div>
      )}
      {isOpen && Object.entries(node).map(([childName, childNode]) => (
        <FileNode key={childName} name={childName} node={childNode} depth={depth + 1} pathPrefix={`${pathPrefix}${name}/`} />
      ))}
    </div>
  );
};

const CustomFileExplorer = () => {
  const { sandpack } = useSandpack();
  const visibleFiles = Object.keys(sandpack.files).filter(f => !sandpack.files[f].hidden);
  const tree = buildFileTree(visibleFiles);

  return (
    <div style={{ padding: '5px' }}>
      {Object.entries(tree).map(([name, node]) => (
        <FileNode key={name} name={name} node={node} depth={0} pathPrefix="" />
      ))}
    </div>
  );
};

// The IDE Controller handles adding files and dependencies safely from within the Sandpack context
function IdeController({ onSave, currentDeps }) {
  const { sandpack } = useSandpack();
  const [newFile, setNewFile] = useState('');
  const [newPackage, setNewPackage] = useState('');
  const [deps, setDeps] = useState(currentDeps || {});

  // Sync deps state when currentDeps changes
  useEffect(() => {
    setDeps(currentDeps || {});
  }, [currentDeps]);

  const handleAddFile = (e) => {
    e.preventDefault();
    if (!newFile) return;
    let filename = newFile.startsWith('/') ? newFile : '/' + newFile;
    if (!filename.includes('.')) filename += '.js';

    // Create new file
    sandpack.updateFile(filename, `export default function ${filename.replace(/[^a-zA-Z]/g, '')}() {\n  return <div>New Component</div>;\n}`);
    sandpack.openFile(filename);
    setNewFile('');
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    if (!newPackage) return;

    const updatedDeps = { ...deps, [newPackage]: 'latest' };
    setDeps(updatedDeps);

    // Update Sandpack bundler setup to pull the new NPM package
    // Since we can't easily mutate setup dynamically without reset, 
    // sandpack exposes a way to add dependencies if we trigger a re-render.
    // In Sandpack v2, updating the provider's customSetup is the official way.
    // However, we can also use sandpack.addPackage if it exists, or pass the state up.
    onSave(sandpack.files, updatedDeps);
    setNewPackage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '260px', background: 'var(--sp-colors-surface1, #151515)', borderRight: '1px solid #333', color: '#e2e8f0' }}>

      {/* FILES SECTION */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '15px 15px 10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', margin: 0, letterSpacing: '0.05em' }}>Explorer</h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 5px' }}>
          {/* Custom File Explorer with inline delete buttons */}
          <CustomFileExplorer />
        </div>

        <div style={{ padding: '10px 15px', borderTop: '1px solid #2a2a2a' }}>
          <form onSubmit={handleAddFile} style={{ display: 'flex', gap: '5px' }}>
            <input
              value={newFile}
              onChange={e => setNewFile(e.target.value)}
              placeholder="Add file (e.g. /components/Btn.js)"
              style={{ flex: 1, padding: '8px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', fontSize: '12px', minWidth: 0 }}
            />
            <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }} title="Create File">+</button>
          </form>
        </div>
      </div>

      {/* DEPENDENCIES SECTION */}
      <div style={{ borderTop: '1px solid #333', padding: '15px', background: '#0f0f0f' }}>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', margin: '0 0 10px 0', letterSpacing: '0.05em' }}>NPM Dependencies</h3>
        <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
            {Object.entries(deps).map(([pkg, version]) => (
              <li key={pkg} style={{ padding: '6px 0', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', color: '#6ee7b7' }}>{pkg}</span>
                <span style={{ color: '#666' }}>{version}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleAddPackage} style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
          <input
            value={newPackage}
            onChange={e => setNewPackage(e.target.value)}
            placeholder="Add package (e.g. axios)"
            style={{ flex: 1, padding: '8px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px', fontSize: '12px' }}
          />
          <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Add</button>
        </form>

        <button
          onClick={() => onSave(sandpack.files, deps)}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, var(--brand), var(--accent))', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          💾 Save Project
        </button>
      </div>
    </div>
  );
}


export default function ReactSandboxPage() {
  const [files, setFiles] = useState({
    // Hide the default root files provided by the Sandpack template so they don't show up in the explorer
    "/App.js": { code: "", hidden: true },
    "/index.js": { code: "", hidden: true },
    "/styles.css": { code: "", hidden: true },

    // Explicitly define our src/ folder structure
    "/src/App.js": {
      code: `import React, { useState } from 'react';\nimport { motion } from 'framer-motion';\nimport './styles.css';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="container">\n      <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>\n        Welcome to your React Sandbox! 🚀\n      </motion.h1>\n      <p style={{ color: '#aaa' }}>Explore the src/ folder and package.json!</p>\n      <br/>\n      <button className="btn" onClick={() => setCount(c => c + 1)}>\n        Clicked {count} times\n      </button>\n    </div>\n  );\n}`,
      active: true // make this the default opened tab
    },
    "/src/index.js": `import React, { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\n\nimport App from "./App";\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);`,
    "/src/styles.css": `.container {\n  padding: 40px;\n  font-family: sans-serif;\n  text-align: center;\n  background: #1e1e1e;\n  color: #fff;\n  min-height: 100vh;\n  margin: -8px;\n}\n\n.btn {\n  padding: 10px 20px;\n  font-size: 16px;\n  cursor: pointer;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n}`,
    "/package.json": `{\n  "name": "react-sandbox",\n  "version": "1.0.0",\n  "main": "/src/index.js",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}`,
    "/public/index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>React App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>`
  });

  const [dependencies, setDependencies] = useState({
    "framer-motion": "latest",
  });

  const [saveStatus, setSaveStatus] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    // We changed the key to v3 to avoid loading the old merged files
    const savedCode = localStorage.getItem('derivskills_react_sandbox_v3_files');
    const savedDeps = localStorage.getItem('derivskills_react_sandbox_v3_deps');
    if (savedCode) {
      try {
        setFiles(JSON.parse(savedCode));
      } catch (e) { }
    }
    if (savedDeps) {
      try {
        setDependencies(JSON.parse(savedDeps));
      } catch (e) { }
    }
  }, []);

  const handleGlobalSave = (currentFiles, currentDeps) => {
    // Extract raw code string from sandpack file objects
    const plainFiles = {};
    for (const [path, fileObj] of Object.entries(currentFiles)) {
      plainFiles[path] = typeof fileObj === 'string' ? fileObj : fileObj.code;
    }

    setFiles(plainFiles);
    setDependencies(currentDeps);

    localStorage.setItem('derivskills_react_sandbox_v3_files', JSON.stringify(plainFiles));
    localStorage.setItem('derivskills_react_sandbox_v3_deps', JSON.stringify(currentDeps));

    setSaveStatus('Project saved to local storage!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0d0d0d', color: 'var(--text-color)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 30px',
        background: '#151515', borderBottom: '1px solid #333'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--brand), var(--accent))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em'
          }}>
            ⚛️ React Sandbox
          </div>
        </div>
        {saveStatus && <span style={{ color: '#10b981', fontWeight: 600 }}>{saveStatus}</span>}
      </header>

      {/* Main Sandbox Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <SandpackProvider
          template="react"
          theme="dark"
          files={files}
          customSetup={{ dependencies }}
        >
          <div style={{ display: 'flex', height: '100%' }}>
            {/* Custom Left Sidebar for Files and NPM Packages */}
            <IdeController onSave={handleGlobalSave} currentDeps={dependencies} />

            {/* Code Editor & Preview with Resizer */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <SandpackLayout style={{ height: '100%', border: 'none', borderRadius: 0 }}>
                <SandpackCodeEditor showTabs={true} closableTabs={true} showLineNumbers={true} style={{ height: '100%' }} />
                <SandpackPreview showRefreshButton={true} showOpenInNewWindow={true} style={{ height: '100%' }} />
              </SandpackLayout>
            </div>
          </div>
        </SandpackProvider>
      </div>
    </div>
  );
}
