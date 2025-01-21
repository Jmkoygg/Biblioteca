import db from "../config/database.js";
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        avatar TEXT
    )
    `)

    function createUserRepository(newUser){7
        return new Promise((resolve, reject) => {
            const { name, email, password, avatar } = newUser;
            db.run(`
                INSERT INTO users (name, email, password, avatar) 
                VALUES (?, ?, ?, ?)
                `, [name, email, password, avatar], 
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({id: this.lastID, ...newUser});
                    }
                })
            })
        }
        export default { createUserRepository }