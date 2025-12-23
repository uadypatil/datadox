const { readDataFromFile, writeDataToFile } = require('../helper/Text');

const DATA_SOURCE_FILE = 'dataSources.json';

/**
 * @typedef {object} DataSource
 * @property {string} id - Unique identifier
 * @property {string} userId - Owner user ID (mapped to User.id)
 * @property {string} title - Title of the data
 * @property {string} contentType - MIME type (text/plain, text/html, application/json, etc.)
 * @property {string} content - Long text data
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Get all data sources
 */
function getAllDataSources() {
    const data = readDataFromFile(DATA_SOURCE_FILE);
    return data || [];
}

/**
 * Get all data sources for a specific user
 */
function getDataSourcesByUserId(userId) {
    return getAllDataSources().filter(ds => ds.userId === userId);
}

/**
 * Get a single data source by ID
 */
function getDataSourceById(id) {
    return getAllDataSources().find(ds => ds.id === id);
}

/**
 * Save new data source
 */
function saveDataSource(data) {
    const dataSources = getAllDataSources();

    const newDataSource = {
        id: Date.now().toString(),
        userId: data.userId,
        title: data.title || 'Untitled',
        contentType: data.contentType || 'text/plain',
        content: data.content || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    dataSources.push(newDataSource);
    writeDataToFile(DATA_SOURCE_FILE, dataSources);

    return newDataSource;
}

/**
 * Update existing data source
 */
function updateDataSource(id, updatedData) {
    const dataSources = getAllDataSources();
    const index = dataSources.findIndex(ds => ds.id === id);

    if (index === -1) return null;

    dataSources[index] = {
        ...dataSources[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
    };

    writeDataToFile(DATA_SOURCE_FILE, dataSources);
    return dataSources[index];
}

/**
 * Delete data source
 */
function deleteDataSource(id) {
    const dataSources = getAllDataSources();
    const filtered = dataSources.filter(ds => ds.id !== id);

    writeDataToFile(DATA_SOURCE_FILE, filtered);
    return filtered.length !== dataSources.length;
}

module.exports = {
    getAllDataSources,
    getDataSourcesByUserId,
    getDataSourceById,
    saveDataSource,
    updateDataSource,
    deleteDataSource
};
