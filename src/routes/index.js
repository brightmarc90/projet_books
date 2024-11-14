const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

// Connectez-vous à Redis
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
    await client.set(bookKey, JSON.stringify(updatedBookData));  // Remplacer les anciennes données par les nouvelles
    res.status(200).json({ message: "Livre mis à jour avec succès", book: updatedBookData });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du livre" });
  }
});

module.exports = router;
