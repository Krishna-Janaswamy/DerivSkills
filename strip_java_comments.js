const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/data');
const files = fs.readdirSync(dir).filter(f => f.endsWith('_problems.js'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    // Replace: java: `// <some text>\npublic class YourClassName {
    // With: java: `public class YourClassName {
    
    // Regex matches: java: ` followed by any number of // comments and newlines, then public class
    const regex = /java:\s*`(\s*\/\/.*?\n)*\s*public class YourClassName/g;
    
    content = content.replace(regex, 'java: `public class YourClassName');
    
    fs.writeFileSync(path.join(dir, file), content);
});

console.log("Stripped top-level comments from Java code in all data files.");
