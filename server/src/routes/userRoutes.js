const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  authenticateUser
} = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users fetched successfully
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get user by email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: User email address
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get('/users/:email', getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/users', createUser);

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Authenticate User
 *     tags:
 *       - Authenticate Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request data
 */
router.post('/auth/user', authenticateUser);

module.exports = router;
