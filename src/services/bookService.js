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
