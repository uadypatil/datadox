const {
    getAllUsers,
    getUserByEmail,
    saveUser
} = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * GET /api/users
 * Get all users
 */
function getUsers(req, res) {
    try {
        const users = getAllUsers();

        // Remove passwordHash before sending response
        const safeUsers = users.map(({ passwordHash, ...user }) => user);

        res.status(200).json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

/**
 * GET /api/users/:email
 * Get user by email
 */
function getUser(req, res) {
    const { email } = req.params;

    const user = getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { passwordHash, ...userWithoutHash } = user;
    res.status(200).json(userWithoutHash);
}

/**
 * POST /api/users
 * Create new user
 */
function createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    // 🔐 Hash password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = saveUser({
        name,
        email,
        passwordHash: hashedPassword
    });

    const { passwordHash, ...userWithoutHash } = newUser;
    res.status(201).json(userWithoutHash);
}

/**
 * GET /api/users/:email
 * Get user by email
 */
function authenticateUser(req, res) {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Get user
    const user = getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // 3. Compare password
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordValid) {
        return res.status(401).json({success: false, message: "Invalid credentials" });
    }

    // 4. Remove passwordHash before sending response
    const { passwordHash, ...userWithoutHash } = user;

    return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutHash,
    });
}

module.exports = { createUser };

module.exports = {
    getUsers,
    getUser,
    createUser,
    authenticateUser
};
