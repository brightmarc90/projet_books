import express, { json } from 'express';
import { connectRedis } from './config/redisConfig.js';
import routes from './routes/index.js';

const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(json());

// Routes

app.use('/api', routes);

// Lancement du serveur
connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
