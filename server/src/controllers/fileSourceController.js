const fs = require('fs');
const path = require('path');

const {
    getAllFiles,
    getFilesByUserId,
    getFileById,
    saveFiles,
    deleteFile
} = require('../models/fileSource');

/**
 * GET /api/file-sources
 * Get all uploaded files
 */
function getFileSources(req, res) {
    try {
        const files = getAllFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch files' });
    }
}

/**
 * GET /api/file-sources/user/:userId
 * Get all files uploaded by a user
 */
function getUserFileSources(req, res) {
    const { userId } = req.params;

    try {
        const files = getFilesByUserId(userId);
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user files' });
    }
}

/**
 * GET /api/file-sources/:id
 * Get single file metadata
 */
function getFileSource(req, res) {
    const { id } = req.params;

    const file = getFileById(id);
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json(file);
}

/**
 * POST /api/file-sources
 * Upload multiple files
 * (Requires multer: upload.array('files'))
 */
function uploadFiles(req, res) {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    try {
        const savedFiles = saveFiles(userId, req.files);
        res.status(201).json(savedFiles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload files' });
    }
}

/**
 * DELETE /api/file-sources/:id
 * Delete file and its metadata
 */
function deleteFileSource(req, res) {
    const { id } = req.params;

    const file = getFileById(id);
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    try {
        // Delete physical file
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Delete metadata
        deleteFile(id);

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete file' });
    }
}

module.exports = {
    getFileSources,
    getUserFileSources,
    getFileSource,
    uploadFiles,
    deleteFileSource
};
