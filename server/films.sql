BEGIN TRANSACTION;

DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    salt TEXT NOT NULL,
    hash TEXT NOT NULL   
);

INSERT INTO users (username, salt, hash)
VALUES
    ('ntt', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'd4c44424b25da2e8e2833aa193a8b6402e77b220f5faf43dd316607fcfe3b6a6423d17105eed21e8c96dafdd8213c8bbaa054988250dd0a17b27aaa4912d81de'),
    ('docente', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'db5d45926d848c2864b3449175d0df395186bce973e7fcc23b89688ee4acb3e0baaef915d9c172ce432610f1776491b66234583d2bab2398d940ca8911528bfb'),
    ('discente', 'cccccccccccccccccccccccccccccccc', 'a9a1218132b5b36bc0c5fed433be9bbaa43eb58778f26e4a791b841a27be5384d5f1c40172b17ece069dece0bba42f1ff2152cf0f500e9d9d86b1c7d6d4c6be6');

CREATE TABLE films (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    uid INTEGER NOT NULL,
    title TEXT NOT NULL,
    favorite BOOLEAN NOT NULL DEFAULT 0,
    watchdate TEXT,
    rating INTEGER CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

INSERT INTO films (uid, title, favorite, watchdate, rating)
VALUES
    (1, '21 Grams', 0, NULL, NULL),
    (2, 'Oldboy', 1, '2024-11-25', 5),
    (3, 'Pulp Fiction', 1, '2025-03-10', 5),
    (1, 'Lord of the Rings', 1, '2022-10-20', 4),
    (2, 'Star Wars', 0, NULL, NULL),
    (3, 'The Matrix', 1, '2025-06-17', 4);

COMMIT;
