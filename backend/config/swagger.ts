import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nexus Store API',
      version: '1.0.0',
      description: 'API documentation for Nexus Store backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
