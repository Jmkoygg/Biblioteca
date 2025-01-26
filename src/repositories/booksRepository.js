import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
)`);
function createBookRepository(newBook, userId) {
  return new Promise((resolve, reject) => {
    const { title, author } = newBook;
    db.run(
      `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
      [title, author, userId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newBook, userId });
        }
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
function updateBookRepository(bookId, updatedBook) {
  return new Promise((resolve, reject) => {
    const { title, author, userId } = updatedBook;
    const fields = ["title", "author", "userId"];
    let query = `UPDATE books SET `;
    const VALUES = [];

    fields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        query += `${field} = ?, `;
        VALUES.push(updatedBook[field]);
      }
    });
    query = query.slice(0, -2);
    query += ` WHERE id = ?`;
    VALUES.push(bookId);

    db.run(query, VALUES, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id: bookId, ...updatedBook });
      }
    });
  });
}
function deleteBookRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(bookId);
      }
    });
  });
}

function searchBookRepository(search) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `${search}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
  searchBookRepository
};
