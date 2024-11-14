const express = require('express');
const { redisClient, connectRedis } = require('./config/redisConfig');

const app = express();
const port = 3000;

// Middleware pour traiter les données JSON
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Lancement du serveur
connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
