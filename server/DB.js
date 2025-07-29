import sqlite3 from "sqlite3";

const DB = new sqlite3.Database('films.db', (err) => {
    if (err) throw err;
});

export default DB;