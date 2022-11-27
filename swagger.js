const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Users',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from Users database.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    schemes:
        ["http", "https"]
    ,
    servers: [
        {
            url: 'http://localhost:8080/api',
            description: 'Local developement server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    tags: [
        {
            name: 'User CRUD operations'
        }
    ],


};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],


};

module.exports = {
    options, swaggerDefinition
}