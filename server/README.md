# API index.js

## 1. GET /api/films
Ritorna un array di JSON.

*E.G.*

GET http://localhost:3001/api/films
```json
[
  {
    "id": 2,
    "title": "21 Grams",
    "favorite": 0,
    "rating": null,
    "watchDate": null
  },
  {
    "id": 3,
    "title": "Star Wars",
    "favorite": 0,
    "rating": null,
    "watchDate": null
  }
]
```

## 2. GET /api/films/:id
Ritorna un JSON con il film `id`.

*E.G.* GET http://localhost:3001/api/films/1
```json
{
  "id": 1,
  "title": "Pulp Fiction",
  "favorite": 1,
  "rating": 5,
  "watchDate": "2025-03-10"
}
```
Nel caso in cui non esiste il film:

*E.G.* GET http://localhost:3001/api/films/6
```json
{
  "error": "Film ID 6 not found"
}
```

## 3. PATCH /api/films/:id/favorite
Ribalta l'attributio `favorite` di un film tramite parametro `id`.

*E.G.* PATCH http://localhost:3001/api/films/5/favorite
```json
{
  "id": 5,
  "title": "Shrek",
  "favorite": 1,
  "rating": 3,
  "watchDate": "2008-04-20"
}
```


## 4. DELETE /api/films/:id
Effetua la cancellazione di un film nel DB tramite il parametro `id`.

*E.G.* DELETE http://localhost:3001/api/films/5
```json
{
  "success": "Film 5 successfully deleted"
}
```