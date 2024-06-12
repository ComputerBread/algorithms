const fs = require('fs');
const path = require('path');

// the dictionary comes from <https://github.com/sujithps/Dictionary/tree/master>

// Function to read the dictionary file and parse it
function parseDictionaryFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const dictionaryArray = [];
    let currentWord = '';
    let currentDefinition = '';

    lines.forEach(line => {
        if (line.trim().length <= 1) {
            // Ignore empty lines
            // Ignore section headers (single letters)
            return;
        } else {
            // Word line
            [currentWord, currentDefinition] = line.trim().split('  ');
            // Definition line
            currentDefinition = line.trim();
            dictionaryArray.push({ word: currentWord, definition: currentDefinition });
            currentWord = '';
            currentDefinition = '';
        }
    });

    return dictionaryArray;
}

// Function to write the array to a JavaScript file
function writeArrayToFile(array, outputFilePath) {
    const arrayString = JSON.stringify(array, null, 2);
    const jsContent = `const dictionary = ${arrayString};\n\nexport default dictionary;`;
    fs.writeFileSync(outputFilePath, jsContent, 'utf-8');
}

// Main function
function main() {
    const inputFilePath = path.join(__dirname, 'OxfordEnglishDictionary.txt'); // Replace with your input file path
    const outputFilePath = path.join(__dirname, 'dictionary.js'); // Replace with your desired output file path

    const dictionaryArray = parseDictionaryFile(inputFilePath);
    writeArrayToFile(dictionaryArray, outputFilePath);

    console.log(`Dictionary array has been written to ${outputFilePath}`);
}

main();
