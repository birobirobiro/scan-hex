const fs = require('fs');
const path = require('path');

const extractColors = (fileContent) => {
  // Regex to match hex color codes
  const colorRegex = /#[A-Fa-f0-9]{6}/g;
  return fileContent.match(colorRegex) || [];
};

const scanFiles = (dir, outputFile) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules') {
      // Skip 'node_modules' directory
      scanFiles(filePath, outputFile);
    } else if (stat.isFile() && filePath.endsWith('.js')) {
      // Process JavaScript files
      console.log(`Scanning file: ${filePath}`);

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const colors = extractColors(fileContent);

      if (colors.length > 0) {
        const output = `File: ${filePath}\nColors: ${colors.join(', ')}\n\n`;

        // Append results to the output file
        fs.appendFileSync(outputFile, output);
      }
    }
  });
};

// Replace 'path/to/your/react/project' with the actual path to your React project
const projectDir = './Front-foodExplorer';

// Replace 'output.txt' with the desired output file name
const outputFile = 'output.txt';

// Clear the existing content of the output file
fs.writeFileSync(outputFile, '');

// Run the script
scanFiles(projectDir, outputFile);

console.log(`Hex colors extracted and saved to ${outputFile}`);
