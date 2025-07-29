import cors from 'cors';
import morgan from 'morgan';
import express, { json } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import * as filmDAO from './daoFilms.js';
import * as userDAO from './daoUsers.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
};

const expireAccessTime = '1m'; // 15m
const expireRefreshTime = '3m'; // 7d
const jwtSecret = 'jwtSecretSuperSafe';
const refreshSecret = 'refreshSecretSuperSafe';

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = 3001;
app.listen(PORT, 
  () => {
      console.log(`\x1b[42m[*]\x1b[0m \x1b[92mListening on port ${PORT}\x1b[0m (http://localhost:${PORT})`);
});

function generateAccessToken(payload) {
  return jsonwebtoken.sign(payload, jwtSecret, { expiresIn: expireAccessTime });
}

function generateRefreshToken(payload) {
  return jsonwebtoken.sign(payload, refreshSecret, { expiresIn: expireRefreshTime });
}

function isAuthN(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
    try {
        const payload = jsonwebtoken.verify(token, jwtSecret);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

/******************/
/***  JWT APIs  ***/
/******************/

app.post('/api/login',
    async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await userDAO.checkUser(username, password);
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            const accessToken = generateAccessToken({ uid: user.uid, username: user.username });
            const refreshToken = generateRefreshToken({ uid: user.uid, username: user.username });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true quando si è in HTTPS
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.json({ token: accessToken });
        } catch (err) {
            res.status(500).json({ error: `Internal server error:\n${err}` });
        }
    }
);

app.get('/api/user', isAuthN,
    (req, res) => {
        res.json({ uid: req.user.uid, username: req.user.username });
    }
);

app.post('/api/refresh',
    (req, res) => {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ error: 'Missing refresh token' });

        try {
            const payload = jsonwebtoken.verify(token, refreshSecret);
            const newAccessToken = generateAccessToken(
                {
                    uid: payload.uid,
                    username: payload.username
                }
            );
            return res.json({ token: newAccessToken });
        } catch (err) {
            return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }
    }
);

app.post('/api/logout',
    (_req, res) => {
        res.clearCookie('refreshToken');
        return res.sendStatus(204);
    }
);

/******************/
/*** Films APIs ***/
/******************/

app.get('/api/films', isAuthN,
    (req, res) => {
        filmDAO.getFilms(req.user.uid)
            .then(films => res.json(films))
            .catch((err) => res.status(500).json(err));
    }
);

app.get('/api/films/:fid', isAuthN,
    async (req, res) => {
        try {
            const result = await filmDAO.getFilmById(req.params.fid, req.user.uid);
            if (result.error) { res.status(404).json(result); }
            else { res.json(result); }
        } catch (err) {
            res.status(500).end();
        }
    }
)

app.post('/api/films', isAuthN,
    async (req, res) => {
        const film = {
            title: req.body.title,
            favorite: req.body.favorite,
            watchdate: req.body.watchDate,
            rating: req.body.rating,
        }
        try {
            const result = await filmDAO.addFilm(req.user.uid, film);
            res.json(result);
        } catch (err) {
            res.status(503).json({ error: err });
        }
    }
);

app.patch('/api/films/:id/favorite', isAuthN,
    async (req, res) => {
        try {
            const result = await filmDAO.flipFavorite(req.params.id, req.user.uid);
            if (result.error) { res.status(404).json(result); }
            else { res.json(result); }
        } catch (err) {
            res.status(503).json({ error: err.message });
        }
    }
);

app.patch('/api/films/:fid/rating', isAuthN,
    async (req, res) => {
        try {
            const result = await filmDAO.updateRating(req.params.fid, req.user.uid, req.body.newRating);
            if (result.error) { res.status(404).json(result); }
            else { res.json(result); }
        } catch (err) {
            res.status(503).json({ error: err.message });
        }
    }
);

app.put('/api/films/:fid', isAuthN,
    async (req, res) => {
        try {
            const { newWatchDate, newRating } = req.body;
            if (newRating === undefined || newWatchDate === undefined) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const result = await filmDAO.updateFilm(req.params.fid, req.user.uid, req.body);
            if (result.error) { res.status(404).json(result); }
            else { res.json(result); }
        } catch (err) {
            res.status(503).json({ error: err.message });
        }
    }
);

app.delete('/api/films/:fid', isAuthN,
    async (req, res) => {
        try {
            const result = await filmDAO.deleteFilm(req.params.fid, req.user.uid);
            if (result.error) { res.status(404).json(result); }
            else { res.json(result); }
        } catch (err) {
            res.status(503).json({ error: err.message });
        }
    }
);