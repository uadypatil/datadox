const fs = require('fs');
const path = require('path');

// Define the base directory where data files will be stored.
// This assumes 'Text.js' is in 'server/src/helper'
// and data is in 'server/data'.
const DATA_DIR = path.join(__dirname, '../data/');

/**
 * Ensures the data directory exists.
 */
function ensureDataDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Created data directory: ${DATA_DIR}`);
  }
}

/**
 * Reads data from a specified JSON file.
 * @param {string} filename - The name of the file (e.g., 'users.json').
 * @returns {object | null} The parsed JSON object or null if an error occurs.
 */
function readDataFromFile(filename) {
  ensureDataDirectoryExists(); // Ensure directory exists before trying to read

  const filePath = path.join(DATA_DIR, filename);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    // Return null or an empty object if the file doesn't exist or is invalid JSON
    if (error.code === 'ENOENT') {
      console.log(`File not found: ${filename}`);
      return null;
    }
    console.error(`Error reading file ${filename}:`, error.message);
    return null;
  }
}

/**
 * Writes data to a specified JSON file.
 * @param {string} filename - The name of the file (e.g., 'users.json').
 * @param {object} data - The data object to write.
 */
function writeDataToFile(filename, data) {
  ensureDataDirectoryExists(); // Ensure directory exists before trying to write

  const filePath = path.join(DATA_DIR, filename);

  try {
    // Convert the data object to a formatted JSON string (2 spaces for indentation)
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonContent, 'utf8');
    console.log(`Successfully wrote data to ${filename}`);
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error.message);
  }
}

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
