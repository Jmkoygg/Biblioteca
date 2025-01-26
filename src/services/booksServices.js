import booksRepository from "../repositories/booksRepository.js";

async function createBooksService(newBook, userId) {
  const createBook = await booksRepository.createBookRepository(
    newBook,
    userId
  );
  if (!createBook) throw new Error("Error creating book");
  return createBook;
}

async function findAllBooksService() {
  const allBooks = await booksRepository.findAllBooksRepository();
  return allBooks;
}
async function findBookByIdService(bookId) {
  const book = await booksRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");
  return book;
}
async function updateBookService(bookId, updatedBook, userId) {
  const book = await booksRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");
  if (userId !== book.userId) throw new Error("Unauthorized user");
  const updateBook = await booksRepository.updateBookRepository(
    bookId,
    updatedBook
  );
  return updateBook;
}
async function deleteBookService(bookId, userId) {
  const book = await booksRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");
  if (book.userId !== userId) throw new Error("Unauthorized user");
  const deletedBook = await booksRepository.deleteBookRepository(bookId);
  return deletedBook;
}
async function searchBooksService(search) {
  if (!search) return ("please search")
  const books = await booksRepository.searchBookRepository(search);
  return books;
}

export default {
  createBooksService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService
};
