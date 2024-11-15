import redis from 'redis';

const client = redis.createClient();
client.connect().catch(console.error);

export async function getAllBooks(req, res) {
    try {
      // Récupérer toutes les clés qui commencent par 'book:'
      const keys = await client.keys('book:*');
  
      if (keys.length === 0) {
        return res.status(404).json({ message: "Aucun livre trouvé" });
      }
  
      // Récupérer les données pour chaque livre
      const books = [];
      for (let key of keys) {
        const bookData = await client.hGetAll(key);
        const bookId = key.split(':')[1];  // Extraire l'ID du livre à partir de la clé
        books.push({ id: bookId, ...bookData });  // Inclure toutes les données du livre
      }
  
      res.status(200).json(books);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
      res.status(500).json({ message: "Erreur serveur lors de la récupération des livres" });
    }
  }
  

  export async function getBookById(req, res) {
    const bookId = req.params.id;
    const bookKey = `book:${bookId}`;
  
    try {
      // Vérifier si le livre existe
      const exists = await client.exists(bookKey);
      if (!exists) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }
  
      // Récupérer toutes les données du livre
      const book = await client.hGetAll(bookKey);
  
      res.status(200).json({ id: bookId, ...book });  // Inclure toutes les données du livre
    } catch (error) {
      console.error("Erreur lors de la récupération du livre :", error);
      res.status(500).json({ message: "Erreur serveur lors de la récupération du livre" });
    }
  }
  

export async function addBook(book) {
  const { id, title, author, year, genre, status } = book;
  const bookKey = `book:${id}`;
  await client.hSet(bookKey, 'title', title, 'author', author, 'year', year, 'genre', genre, 'status', status);
  return book;
}

export async function updateBook(bookId, updatedBook) {
  const bookKey = `book:${bookId}`;
  const exists = await client.exists(bookKey);
  if (!exists) return null;
  await client.hSet(bookKey, ...Object.entries(updatedBook).flat());
  return { id: bookId, ...updatedBook };
}

export async function deleteBook(bookId) {
  const bookKey = `book:${bookId}`;
  const exists = await client.exists(bookKey);
  if (!exists) return false;
  await client.del(bookKey);
  return true;
}
