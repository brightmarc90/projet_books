import express from 'express';
import bookRoutes from './routes/bookRoutes.js';

const app = express();

app.use(express.json());
app.use(bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
