const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DataDox API Documentation',
            version: '1.0.0',
            description: 'API documentation for the React + Node.js project, managed via file system storage.',
            contact: {
                name: 'Uday',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1', // Update port if necessary
                description: 'Development Server',
            },
        ],
    },
    // Paths to files containing OpenAPI definitions (JSDoc comments)
    // This will scan your entire src folder for .js files
    apis: [path.join(__dirname, '../routes/*.js')],
    // apis: [path.join(__dirname, '../**/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
