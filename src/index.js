import express, { json } from 'express';
import { redisClient, connectRedis } from './config/redisConfig';

const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(json());

// Routes
import routes from './routes';
app.use('/api', routes);

// Lancement du serveur
connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
