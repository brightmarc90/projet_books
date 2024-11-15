import * as bookService from '../services/bookService.js';

export async function getAllBooks(req, res) {
  try {
    const books = await bookService.getAllBooks();
    if (books.length === 0) {
      return res.status(404).json({ message: "Aucun livre trouvé" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des livres" });
  }
}

export async function getBookById(req, res) {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du livre" });
  }
}

export async function addBook(req, res) {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json({ message: "Livre ajouté avec succès", book });
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout du livre" });
  }
}

export async function updateBook(req, res) {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.status(200).json({ message: "Livre mis à jour avec succès", book: updatedBook });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du livre" });
  }
}

export async function deleteBook(req, res) {
  try {
    const success = await bookService.deleteBook(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du livre" });
  }
}
