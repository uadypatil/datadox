const express = require('express');
const router = express.Router();

const {
  getDataSource,
  getUserDataSources,
  createDataSource,
  updateDataSourceById,
  deleteDataSourceById
} = require('../controllers/dataSourceController');

/**
 * @swagger
 * tags:
 *   name: DataSources
 *   description: User-specific data source management
 */

/**
 * @swagger
 * /sources/data:
 *   get:
 *     summary: Get all data sources
 *     tags: [DataSources]
 *     responses:
 *       200:
 *         description: List of all data sources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DataSource'
 *       500:
 *         description: Failed to fetch data sources
 */
router.get('/sources/data', getDataSource);

/**
 * @swagger
 * /sources/data/user/{userId}:
 *   get:
 *     summary: Get all data sources for a specific user
 *     tags: [DataSources]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of data sources for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DataSource'
 *       500:
 *         description: Failed to fetch user data sources
 */
router.get('/sources/data/user/:userId', getUserDataSources);

/**
 * @swagger
 * /sources/data/{id}:
 *   get:
 *     summary: Get a single data source by ID
 *     tags: [DataSources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Data source ID
 *     responses:
 *       200:
 *         description: Data source details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       404:
 *         description: Data source not found
 */
router.get('/sources/data/:id', getDataSource);

/**
 * @swagger
 * /sources/data:
 *   post:
 *     summary: Create a new data source
 *     tags: [DataSources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDataSource'
 *     responses:
 *       201:
 *         description: Data source created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to create data source
 */
router.post('/sources/data', createDataSource);

/**
 * @swagger
 * /sources/data/{id}:
 *   put:
 *     summary: Update an existing data source
 *     tags: [DataSources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Data source ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDataSource'
 *     responses:
 *       200:
 *         description: Data source updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       404:
 *         description: Data source not found
 */
router.put('/sources/data/:id', updateDataSourceById);

/**
 * @swagger
 * /sources/data/{id}:
 *   delete:
 *     summary: Delete a data source
 *     tags: [DataSources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Data source ID
 *     responses:
 *       200:
 *         description: Data source deleted successfully
 *       404:
 *         description: Data source not found
 */
router.delete('/sources/data/:id', deleteDataSourceById);

module.exports = router;
