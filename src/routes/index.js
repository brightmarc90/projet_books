import { Router } from 'express';
import { createClient } from 'redis';

const router = Router();
const client = createClient();

// Connexion à Redis
client.connect().catch(console.error);

router.get('/', (req, res) => {
  res.send('Welcome to the project Books!');
});

// Route deleteBooks pour supprimer un livre
router.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const bookKey = `book:${bookId}`;

  try {
    const exists = await client.exists(bookKey);
    if (!exists) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    await client.del(bookKey);
    res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du livre" });
  }
});

// Route pour ajouter un livre avec id, title, author, year, genre, statut
router.post('/books', async (req, res) => {
  const { id, title, author, year, genre, status } = req.body;

  if (!id || !title || !author || !year || !genre || !status) {
    return res.status(400).json({ message: "Toutes les informations du livre doivent être fournies" });
  }

  const bookKey = `book:${id}`;

  try {
    // Ajouter un livre avec plusieurs champs dans Redis
    await client.hSet(bookKey, 'title', title, 'author', author, 'year', year, 'genre', genre, 'status', status);
    res.status(201).json({ message: "Livre ajouté avec succès", book: { id, title, author, year, genre, status } });
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout du livre" });
  }
});

router.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const bookKey = `book:${bookId}`;
  const updatedBookData = req.body;  // Les nouvelles données du livre envoyées dans le corps de la requête
 
  try {
    // Vérifiez si le livre existe dans Redis
    const exists = await client.exists(bookKey);
    if (!exists) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
 
    // Mettre à jour les informations du livre dans Redis
    await client.hSet(bookKey, 'title', updatedBookData.title, 'author', updatedBookData.author, 'year', updatedBookData.year, 'genre', updatedBookData.genre, 'status', updatedBookData.status);
    //await client.hSet(bookKey, JSON.stringify(updatedBookData));  // Remplacer les anciennes données par les nouvelles
    res.status(200).json({ message: "Livre mis à jour avec succès", book: updatedBookData });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du livre" });
  }
});

// Route pour lire tous les livres
router.get('/books', async (req, res) => {
  try {
    // Récupérer toutes les clés qui commencent par 'book:'
    const keys = await client.keys('book:*');
    
    if (keys.length === 0) {
      return res.status(404).json({ message: "Aucun livre trouvé" });
    }

    // Récupérer les données pour chaque livre
    const books = [];
    for (let key of keys) {
      const book = await client.hGetAll(key);
      const bookId = key.split(':')[1];  // Extraire l'ID du livre à partir de la clé
      books.push({ id: bookId, ...book });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des livres" });
  }
});


// Route pour lire un livre par ID
router.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const bookKey = `book:${bookId}`;

  try {
    // Vérifier si le livre existe
    const exists = await client.exists(bookKey);
    if (!exists) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    // Récupérer les données du livre
    const book = await client.hGetAll(bookKey);

    res.status(200).json({ id: bookId, ...book });
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du livre" });
  }
});

export default router;
