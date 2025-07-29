import DB from "./DB.js";
import crypto from "crypto";

export function checkUser(username, password) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        DB.get(query, [username], (err, row) => {
            if (err) { reject(err); }
            else if (!row) { resolve(false); }
            else {
                crypto.scrypt(password, row.salt, 64, function (err, hash) {
                    if (err) { reject(err); }
                    if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hash)) {
                        resolve(false);
                    } else {
                        const user = {
                            uid: row.uid,
                            username: row.username
                        }
                        resolve(user);
                    }
                });
            }
        });
    });
}