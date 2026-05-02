const fs = require('fs');

function fixNewlines(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace \\n (literally two backslashes followed by n) with a unique marker
    content = content.replace(/\\\\n/g, '__ESCAPED_NEWLINE__');
    
    // Now replace \n (one backslash followed by n) with actual newline character
    content = content.replace(/\\n/g, '\n');
    
    // Now restore the __ESCAPED_NEWLINE__ to \\n
    content = content.replace(/__ESCAPED_NEWLINE__/g, '\\\\n');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
}

fixNewlines('./src/data/array_problems.js');
fixNewlines('./src/data/array_problems_part2.js');
