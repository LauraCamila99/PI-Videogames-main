const { Router } = require('express');
const genresRouter = Router();

// Se utilizan los handelrs que se realizaron para lo que tiene que ver con Genre
//Obtiene un arreglo con todos los géneros existentes de la API.
const getGenresHandler = require ('../handlers/genresHandlers')


// Definiendo la ruta para obtener generos
genresRouter.get('/',getGenresHandler);


module.exports = genresRouter;