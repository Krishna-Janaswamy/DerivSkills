const fs = require('fs');

let content = fs.readFileSync('src/data/roles.js', 'utf-8');

const outRegex = /outcomes:\s*\[(.*?)\]/g;

content = content.replace(outRegex, (match, arrayInner) => {
    let arr;
    try {
        arr = eval('[' + arrayInner + ']');
    } catch (e) {
        return match;
    }

    let newArr = [];
    for (let item of arr) {
        // We want to split by comma, but ONLY if the comma is NOT inside parentheses.
        // Also skip splitting if it looks like a numbered list item like "01. a, b, c" because my previous script already tried to handle that. Wait, no, we should split them too if they are just concepts like "Variables, data types, operators"
        
        let depth = 0;
        let parts = [];
        let currentPart = "";
        
        for (let i = 0; i < item.length; i++) {
            let char = item[i];
            if (char === '(') depth++;
            else if (char === ')') depth--;
            
            if (char === ',' && depth === 0) {
                parts.push(currentPart.trim());
                currentPart = "";
            } else {
                currentPart += char;
            }
        }
        parts.push(currentPart.trim());
        
        // If it got split, add the parts
        if (parts.length > 1) {
            for (let part of parts) {
                if (part.length > 0) newArr.push(part);
            }
        } else {
            newArr.push(item);
        }
    }

    let newArrayInner = newArr.map(s => {
        return "'" + s.replace(/'/g, "\\'") + "'";
    }).join(', ');

    return `outcomes: [${newArrayInner}]`;
});

fs.writeFileSync('src/data/roles.js', content);
console.log("Successfully split comma-separated items in roles.js");
