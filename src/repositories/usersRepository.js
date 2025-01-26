import db from "../config/database.js";
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        avatar TEXT
    )
    `);

function createUserRepository(newUser) {
  7;
  return new Promise((resolve, reject) => {
    const { name, email, password, avatar } = newUser;
    db.run(
      `
                INSERT INTO users (name, email, password, avatar) 
                VALUES (?, ?, ?, ?)
                `,
      [name, email, password, avatar],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}
async function findUserByEmailRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `
                    SELECT id, name, email, password, avatar 
                    FROM users 
                    WHERE email = ?
                    `,
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}
async function findUserByIdRepository(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
                    SELECT id, name, email, password, avatar 
                    FROM users 
                    WHERE id = ?
                    `,
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}
function findAllUsersRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
                    SELECT id, name, email, avatar 
                    FROM users
                    `,
      [],
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
function updateUserRepository(user, id) {
  return new Promise((resolve, reject) => {
    const { name, email, password, avatar } = user;
    const fields = ["name", "email", "password", "avatar"];
    let query = `UPDATE users SET `;
    const VALUES = [];

    fields.forEach((field) => {
      if (user[field] !== undefined) {
        query += `${field} = ?, `;
        VALUES.push(user[field]);
      }
    });
    query = query.slice(0, -2);
    query += ` WHERE id = ?`;
    VALUES.push(id);

    db.run(query, VALUES, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id, ...user });
      }
    });
  });
}
async function deleteUserRepository(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `
                DELETE FROM users 
                WHERE id = ?
                `,
      [id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "user deleted successfully", id });
        }
      }
    );
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  findAllUsersRepository,
  updateUserRepository,
  deleteUserRepository,
};
