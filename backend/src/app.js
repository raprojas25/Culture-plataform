import express from 'express';
import routes from './routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
//documentacion api swagger
// import swaggerUi from 'swagger-ui-express';
// import { swaggerSpec } from './config/swagger.js';
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//cierre de documentacion api swagger

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorMiddleware);

export default app;

