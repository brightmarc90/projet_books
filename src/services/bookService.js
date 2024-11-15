import redis from 'redis';

const client = redis.createClient();
client.connect().catch(console.error);

export async function getAllBooks() {
  const keys = await client.keys('book:*');
  const books = [];
  for (let key of keys) {
    const book = await client.hGetAll(key);
    const bookId = key.split(':')[1];
    books.push({ id: bookId, ...book });
  }
  return books;
}

export async function getBookById(bookId) {
  const bookKey = `book:${bookId}`;
  const exists = await client.exists(bookKey);
  if (!exists) return null;
  return { id: bookId, ...(await client.hGetAll(bookKey)) };
}

export async function addBook(book) {
  const { id, title, author, year, genre, status } = book;
  const bookKey = `book:${id}`;
 
  // Vérification si toutes les données nécessaires sont présentes
  if (!id || !title || !author || !year || !genre || !status) {
    throw new Error("Données du livre incomplètes.");
  }
 
  // Ajouter les données dans Redis
  //await client.hSet(bookKey, 'title', title, 'author', author, 'year', year, 'genre', genre, 'status', status);
  await client.hSet(bookKey, [
    ['title', title],
    ['author', author],
    ['year', year],
    ['genre', genre],
    ['status', status]
  ]);
  return book;
}

export async function updateBook(bookId, updatedBook) {
  const bookKey = `book:${bookId}`;
 
  // Vérifier si le livre existe
  const exists = await client.exists(bookKey);
  if (!exists) return null;
 
  // Récupérer les données actuelles du livre
  const currentBook = await client.hGetAll(bookKey);
 
  // Fusionner les données actuelles avec les nouvelles données
  const updatedData = { ...currentBook, ...updatedBook };
 
  // Mettre à jour seulement les champs spécifiés
  await client.hSet(bookKey, [
    ['title', updatedData?.title],
    ['author', updatedData?.author],
    ['year', updatedData?.year],
    ['genre', updatedData?.genre],
    ['status', updatedData?.status]
  ]);
 
  // Retourner les données mises à jour
  return { id: bookId, ...updatedData };
}

export async function deleteBook(bookId) {
  const bookKey = `book:${bookId}`;
  const exists = await client.exists(bookKey);
  if (!exists) return false;
  await client.del(bookKey);
  return true;
}
