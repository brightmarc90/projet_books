// src/routes/books.js
const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

// Connectez-vous à Redis
client.connect().catch(console.error);

// Route deleteBooks pour supprimer un livre
router.delete('/deleteBooks/:id', async (req, res) => {
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

module.exports = router;
