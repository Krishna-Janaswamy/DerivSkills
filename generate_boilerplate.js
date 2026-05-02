const fs = require('fs');
const path = require('path');

// Read roles.js
const rolesContent = fs.readFileSync(path.join(__dirname, 'src/data/roles.js'), 'utf-8');

// Use regex to extract all outcomes arrays for the dsa track
// We know DSA track starts around line 250 and ends around 300.
// Let's just match all outcomes: [...]
const regex = /outcomes:\s*\[(.*?)\]/g;
let match;
let allOutcomes = new Set();

while ((match = regex.exec(rolesContent)) !== null) {
    const arrString = match[1];
    // Split by comma, but be careful with strings containing commas
    // Safest way is to use eval to parse the array string
    try {
        const arr = eval('[' + arrString + ']');
        arr.forEach(item => allOutcomes.add(item));
    } catch (e) {
        // Ignore parsing errors for complex ones if any
    }
}

console.log(`Found ${allOutcomes.size} unique outcomes.`);

// Now let's generate auto_generated_problems.js for missing ones
let output = `export const AUTO_GENERATED_PROBLEMS = {\n`;

for (let outcome of allOutcomes) {
    // Escape single quotes and backslashes
    const safeOutcome = outcome.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    
    // Create boilerplate
    output += `  '${safeOutcome}': {\n`;
    output += `    javascript: \`// ${safeOutcome}\\nfunction execute() {\\n    console.log("Placeholder for: ${safeOutcome}");\\n}\\nexecute();\`,\n`;
    output += `    python: \`# ${safeOutcome}\\ndef execute():\\n    print("Placeholder for: ${safeOutcome}")\\nexecute()\`,\n`;
    output += `    java: \`public class YourClassName {\\n    public static void main(String[] args) {\\n        System.out.println("Placeholder for: ${safeOutcome}");\\n    }\\n}\`,\n`;
    output += `    cpp: \`// ${safeOutcome}\\n#include <iostream>\\nusing namespace std;\\nint main() {\\n    cout << "Placeholder for: ${safeOutcome}" << endl;\\n    return 0;\\n}\`,\n`;
    output += `    c: \`// ${safeOutcome}\\n#include <stdio.h>\\nint main() {\\n    printf("Placeholder for: ${safeOutcome}\\\\n");\\n    return 0;\\n}\`\n`;
    output += `  },\n`;
}

output += `};\n`;

fs.writeFileSync(path.join(__dirname, 'src/data/auto_generated_problems.js'), output);
console.log('Successfully wrote auto_generated_problems.js');
