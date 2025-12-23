const {
    getAllDataSources,
    getDataSourcesByUserId,
    getDataSourceById,
    saveDataSource,
    updateDataSource,
    deleteDataSource
} = require('../models/dataSource');

/**
 * GET /api/data-sources
 * Get all data sources
 */
function getDataSources(req, res) {
    try {
        const dataSources = getAllDataSources();
        res.status(200).json(dataSources);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data sources' });
    }
}

/**
 * GET /api/data-sources/user/:userId
 * Get all data sources for a user
 */
function getUserDataSources(req, res) {
    const { userId } = req.params;

    try {
        const dataSources = getDataSourcesByUserId(userId);
        res.status(200).json(dataSources);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data sources' });
    }
}

/**
 * GET /api/data-sources/:id
 * Get single data source by ID
 */
function getDataSource(req, res) {
    const { id } = req.params;

    const dataSource = getDataSourceById(id);

    if (!dataSource) {
        return res.status(404).json({ message: 'Data source not found' });
    }

    res.status(200).json(dataSource);
}

/**
 * POST /api/data-sources
 * Create new data source
 */
function createDataSource(req, res) {
    const { userId, title, contentType, content } = req.body;

    if (!userId || !content) {
        return res.status(400).json({
            message: 'userId and content are required'
        });
    }

    try {
        const newDataSource = saveDataSource({
            userId,
            title,
            contentType,
            content
        });

        res.status(201).json(newDataSource);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create data source' });
    }
}

/**
 * PUT /api/data-sources/:id
 * Update data source
 */
function updateDataSourceById(req, res) {
    const { id } = req.params;
    const { title, contentType, content } = req.body;

    const updated = updateDataSource(id, {
        title,
        contentType,
        content
    });

    if (!updated) {
        return res.status(404).json({ message: 'Data source not found' });
    }

    res.status(200).json(updated);
}

/**
 * DELETE /api/data-sources/:id
 * Delete data source
 */
function deleteDataSourceById(req, res) {
    const { id } = req.params;

    const deleted = deleteDataSource(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Data source not found' });
    }

    res.status(200).json({ message: 'Data source deleted successfully' });
}

module.exports = {
    getDataSources,
    getUserDataSources,
    getDataSource,
    createDataSource,
    updateDataSourceById,
    deleteDataSourceById
};
