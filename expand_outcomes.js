const fs = require('fs');

let content = fs.readFileSync('src/data/roles.js', 'utf-8');

// We need to parse the arrays of outcomes and expand strings that look like "01-05. A, B, C, D"
// Because regex replacement on the whole file might be fragile, we'll use a replacer function on the outcomes arrays.

const outRegex = /outcomes:\s*\[(.*?)\]/g;

content = content.replace(outRegex, (match, arrayInner) => {
    // Evaluate the array to get actual strings
    let arr;
    try {
        arr = eval('[' + arrayInner + ']');
    } catch (e) {
        return match; // fallback if parse fails
    }

    let newArr = [];
    for (let item of arr) {
        // Match patterns like "01-05. Item1, Item2, Item3" or "Problems: 01-05. Item1, Item2" or "Top 20: 01-05. Item"
        const rangeMatch = item.match(/^(?:.*?(?:Problems|Top \d+):\s*)?(\d{2})[-/]?(\d{2})?\.\s*(.*)/);
        
        if (rangeMatch && rangeMatch[1] && rangeMatch[3]) {
            let startNum = parseInt(rangeMatch[1], 10);
            let endNum = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : startNum + 10; // If no end, just increment
            
            // Split the rest by comma
            // Some have slashes instead of commas for groupings, e.g. "Next/Prev Greater/Smaller"
            // We only split by comma if there are multiple distinct items intended.
            let parts = rangeMatch[3].split(/,\s*/);
            
            // Generate new items
            let currentNum = startNum;
            for (let part of parts) {
                // Formatting number to 2 digits
                let numStr = currentNum.toString().padStart(2, '0');
                newArr.push(`${numStr}. ${part}`);
                currentNum++;
            }
        } else {
            // Not a ranged string, keep it as is
            newArr.push(item);
        }
    }

    // Convert back to string representation
    let newArrayInner = newArr.map(s => {
        // Escape single quotes
        return "'" + s.replace(/'/g, "\\'") + "'";
    }).join(', ');

    return `outcomes: [${newArrayInner}]`;
});

fs.writeFileSync('src/data/roles.js', content);
console.log("Successfully expanded grouped outcomes in roles.js");
