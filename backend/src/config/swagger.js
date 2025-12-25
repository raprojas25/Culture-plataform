import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Eventos',
      version: '1.0.0',
    },
  },
  apis: ['./src/modules/**/*.routes.js'],
});
