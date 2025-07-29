import DB from "./DB.js";
import dayjs from "dayjs";

const castFilm = (f) => {
  const film = {};
  film.id = f.id;
  film.title = f.title;
  film.favorite = f.favorite;
  film.rating = f.rating;
  film.watchDate = f.watchdate;
  film.userId = f.userId;
  return film;
}

export function getFilms(uid) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM films WHERE uid = ?";
    DB.all(query, [uid], (err, rows) => {
      if (err) { reject(err); }
      const films = rows.map(f => castFilm(f));
      resolve(films);
    });
  });
};

export function getFilmById(fid, uid) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM films WHERE id = ? AND uid = ?";
    DB.get(query, [fid, uid], (err, row) => {
      if (err) { reject(err); }
      if (row === undefined) { resolve({error: `Film ID ${fid} not found`}); }
      else { resolve(castFilm(row)); }
    });
  });
}

export async function addFilm(uid, film) {
  return new Promise((resolve, reject) => {
    const query =
    "INSERT INTO films (uid, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)";
    DB.run(
      query,
      [
        uid,
        film.title,
        film.favorite,
        film.watchdate,
        film.rating
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(getFilmById(this.lastID, uid));
        }
      }
    );
  });
}

export function flipFavorite(fid, uid) {
  return new Promise((resolve, reject) => {
    const film = getFilmById(fid, uid);
    if (!film || film.error) { reject(`Film ID ${fid} not found`); }
    const query = "UPDATE films SET favorite = NOT favorite WHERE id = ? AND uid = ?";
    DB.run(query, [fid, uid], function (err) {
      if (err) { reject(err); }
      else { resolve(getFilmById(fid, uid)); }
    });
  });
}

export function updateRating(fid, uid, newRating) {
  return new Promise((resolve, reject) => {
    const film = getFilmById(fid);
    if (!film || film.error) { reject(`Film ID ${fid} not found`); }
    const query = "UPDATE films SET rating = ? WHERE id = ? AND uid = ?";
    DB.run(query, [newRating, fid, uid], function (err) {
      if (err) { reject(err); }
      else { resolve(getFilmById(fid, uid)); }
    });
  });
}

export function updateFilm(fid, uid, newData) {
  return new Promise((resolve, reject) => {
    const film = getFilmById(fid);
    if (!film || film.error) { reject(`Film ID ${fid} not found`); }
    const { newWatchDate, newRating } = newData;
    const query = "UPDATE films SET watchdate = ?, rating = ? WHERE id = ? AND uid = ?";
    DB.run(query, [newWatchDate, newRating, fid, uid], function (err) {
      if (err) { reject(err); }
      else { resolve(getFilmById(fid, uid)); }
    });
  });
}

export async function deleteFilm(fid, uid) {
  const film = await getFilmById(fid, uid);
  if (!film || film.error) { throw new Error(`Film ID ${fid} not found`); }
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM films WHERE id = ? AND uid = ?";
    DB.run(query, [fid, uid], function (err) {
      if (err) { reject(err); }
      else { resolve({"success": `Film ${fid} successfully deleted`}); }
    });
  });
}