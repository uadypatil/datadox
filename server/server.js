// Load environment variables from .env file
// require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors'); // Security middleware
const helmet = require('helmet'); // Security middleware
const path = require('path');

// Import the main application router
// This file (src/routes/router.js) should consolidate all other specific routes
const apiRouter = require('./src/routes/router');

// ... (existing require statements) ...
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swaggerConfig'); // Import the config
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware Setup ---
app.use(helmet()); // Add basic security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Handle form data

// Optional: Serve static files (e.g., if you are serving a React front-end from here)
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json()); 


// --- Route Handling ---
// Mount the main API router under a specific base path (e.g., /api/v1)
app.use('/api/v1', apiRouter);
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/v1', userRoutes);
const dataSourceRoutes = require('./src/routes/dataSourceRoutes');
app.use('/api/v1', dataSourceRoutes);
const fileSourceRoutes = require('./src/routes/fileSourceRoutes');
app.use('/api/v1', fileSourceRoutes);

// setting up swagger
// --- Swagger Documentation Route ---
// This serves the interactive UI at http://localhost:3000/api-docs
app.use('/api/v1/sw/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Define a simple root route
app.get('/', (req, res) => {
    res.send('Welcome to the API server! <br> Access restricted for Api\'s');
});

// Optional: Global Error Handler Middleware
// Place this as the very last middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server' });
});
    
// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running successfully on port http://localhost:${PORT}/`);
    console.log(`Server running swagger on http://localhost:${PORT}/api/v1/sw/docs`);
});
