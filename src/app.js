import express, { json } from 'express';
import { connectRedis } from './config/redisConfig.js';
import bookRoutes from './routes/bookRoutes.js';  // Routes liées aux livres
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swaggerConfig.js';

const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes pour les livres
app.use('/api', bookRoutes);  // Toutes les routes liées aux livres seront maintenant sous '/api'

// Lancement du serveur
connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
