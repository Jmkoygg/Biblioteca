import booksServices from "../services/booksServices.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;
    try {
        const createBook = await booksServices.createBooksService(newBook, userId);
        res.status(201).send(createBook);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function findAllBooksController(req, res) {
    try {
        const allBooks = await booksServices.findAllBooksService();
        res.send(allBooks);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
async function findBookByIdController(req, res) {
    const bookId = req.params.id;
    try {
        const book = await booksServices.findBookByIdService(bookId);
        res.send(book);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function updateBookController(req, res) {
    const updatedBook = req.body;
    const bookId = req.params.id;
    const userId = req.userId;
    try {
        const updateBook = await booksServices.updateBookService(bookId, updatedBook, userId);
        res.send(updateBook);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
async function deleteBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.userId;
    try {
        const deletedBook = await booksServices.deleteBookService(bookId, userId);
        res.send({deleted: deletedBook});
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
async function searchBookController(req, res) {
    const { search } = req.query
    try {
        const books = await booksServices.searchBooksService(search)
        res.send(books)
    } catch(error){
        res.status(400).send(error.message)

    }
}
export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBookController
 }