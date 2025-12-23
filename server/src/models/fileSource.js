const { readDataFromFile, writeDataToFile } = require('../helper/Text');

const FILE_SOURCE_FILE = 'fileSources.json';

/**
 * @typedef {object} FileSource
 * @property {string} id
 * @property {string} userId
 * @property {string} originalName
 * @property {string} fileName
 * @property {string} mimeType
 * @property {number} size
 * @property {string} path
 * @property {string} createdAt
 */

/**
 * Get all files
 */
function getAllFiles() {
  return readDataFromFile(FILE_SOURCE_FILE) || [];
}

/**
 * Get all files for a user
 */
function getFilesByUserId(userId) {
  return getAllFiles().filter(file => file.userId === userId);
}

/**
 * Get file by ID
 */
function getFileById(id) {
  return getAllFiles().find(file => file.id === id);
}

/**
 * Save multiple files
 */
function saveFiles(userId, files) {
  const storedFiles = getAllFiles();

  const newFiles = files.map(file => ({
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    userId,
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    createdAt: new Date().toISOString()
  }));

  storedFiles.push(...newFiles);
  writeDataToFile(FILE_SOURCE_FILE, storedFiles);

  return newFiles;
}

/**
 * Delete file metadata
 */
function deleteFile(id) {
  const files = getAllFiles();
  const filtered = files.filter(file => file.id !== id);

  writeDataToFile(FILE_SOURCE_FILE, filtered);
  return filtered.length !== files.length;
}

module.exports = {
  getAllFiles,
  getFilesByUserId,
  getFileById,
  saveFiles,
  deleteFile
};
