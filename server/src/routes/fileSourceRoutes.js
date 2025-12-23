const express = require('express');
const router = express.Router();

const {
    getFileSources,
    getUserFileSources,
    getFileSource,
    uploadFiles,
    deleteFileSource
} = require('../controllers/fileSourceController');

// Multer middleware (already configured elsewhere)
const upload = require('../middlewares/upload');

/**
 * @swagger
 * tags:
 *   name: FileSources
 *   description: File upload and management APIs
 */

/**
 * @swagger
 * /source/file:
 *   get:
 *     summary: Get all uploaded files
 *     tags: [FileSources]
 *     responses:
 *       200:
 *         description: List of all uploaded files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FileSource'
 *       500:
 *         description: Failed to fetch files
 */
router.get('/source/file', getFileSources);

/**
 * @swagger
 * /source/file/user/{userId}:
 *   get:
 *     summary: Get all files uploaded by a specific user
 *     tags: [FileSources]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FileSource'
 *       500:
 *         description: Failed to fetch user files
 */
router.get('/source/file/user/:userId', getUserFileSources);

/**
 * @swagger
 * /source/file/{id}:
 *   get:
 *     summary: Get file metadata by ID
 *     tags: [FileSources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileSource'
 *       404:
 *         description: File not found
 */
router.get('/source/file/:id', getFileSource);

/**
 * @swagger
 * /source/file:
 *   post:
 *     summary: Upload multiple files
 *     tags: [FileSources]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - files
 *             properties:
 *               userId:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FileSource'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to upload files
 */
router.post(
    '/source/file',
    upload.array('files', 10),
    uploadFiles
);

/**
 * @swagger
 * /source/file/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     tags: [FileSources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Failed to delete file
 */
router.delete('/source/file/:id', deleteFileSource);

module.exports = router;
