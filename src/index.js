import express, { json } from 'express';
import { connectRedis } from './config/redisConfig.js';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swaggerConfig.js';

const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(json());

// Routes
console.log(swaggerDocs)
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Lancement du serveur
connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
