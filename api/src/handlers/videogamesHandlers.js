// Importando el módulo Axios para manejar solicitudes HTTP.
const axios = require('axios');

// Importando el modelo Videogame del archivo db.js.
const { Videogame } = require('../db.js');

// Importando funciones controladoras para el manejo de videojuegos desde el archivo videogamesControllers.js.
const { createVideoGame, getVideogameById, getVideogameByName, getAllGames, searchByName} = require('../controllers/videogamesControllers.js');

//RUTA  GET | /videogames
// Definición de un controlador para obtener todos los videojuegos.
const getVideogamesHandler = async (req, res) => {
    // Extrayendo el parámetro 'name' de la consulta HTTP.
    const { name } = req.query;
    // Llamando a la función getVideogameByName si 'name' está presente, de lo contrario llamando a getAllGames.
    const results = name ? await getVideogameByName(name) : await getAllGames();
    // Enviando la respuesta HTTP basada en el resultado obtenido.
    if (name) {
        res.send(await results);
    } else {
        res.send(await results);
    }
};

//RUTA  GET | /videogames/:id
// Definición de un controlador para obtener un videojuego por su ID.
const getVideogameByIdHandler = async (req, res) => {
    // Extrayendo el parámetro 'id' de los parámetros de la solicitud HTTP.
    const { id } = req.params;
    // Determinando la fuente de los datos, si el 'id' es un número, se considera como ID de la base de datos, de lo contrario, se asume que es de la API.
    const source = isNaN(id) ? "db" : "api";
    try {
        // Obteniendo el videojuego por su ID y fuente especificada.
        const videoGame = await getVideogameById(id, source);

        // Enviando una respuesta HTTP con el videojuego encontrado.
        res.status(200).json(videoGame);
    } catch (error) {
        // Manejando errores y enviando una respuesta de error si ocurre algún problema.
        res.status(400).json({ error: error.message });
    }
};

//RUTA  GET | /videogames/name?="..."
//Definicion de un controlador para obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
const getVideogameByNameHandler = async (req, res) => {
    try {
        // Extrayendo el parámetro 'name' de los parámetros de la solicitud HTTP.
        const { name } = req.query;
        
        // Determinando la fuente de los datos, si el 'name' contiene solo letras, se considera búsqueda en la base de datos, de lo contrario, se asume que es de la API.
        const source = /^[A-Za-z\s]+$/.test(name) ? "db" : "api";

        // Realizar la búsqueda de videojuegos por nombre según la fuente especificada.
        const videogames = await getVideogameByName(name, source);

        // Enviando una respuesta HTTP con los videojuegos encontrados.
        res.status(200).json(videogames);
    } catch (error) {
        // Manejando errores y enviando una respuesta de error si ocurre algún problema.
        res.status(400).json({ error: error.message });
    }
};



//RUTA POST | /videogames
// Definición de un controlador para agregar un nuevo videojuego.
const postVideogamesHandler = async (req, res) => {
    // Extrayendo los datos del cuerpo de la solicitud HTTP.
    const { name, description, platforms, image, released, rating, genre } = req.body;

    try {
        // Verificando si todos los datos necesarios están presentes.
        if (!name || !description || !platforms || !image || !released || !rating || !genre) throw Error("Missing data");

        // Creando un nuevo videojuego con los datos proporcionados.
        const newVideoGame = await createVideoGame(name, description, platforms, image, released, rating, genre);
        
        // Enviando una respuesta HTTP con el nuevo videojuego creado.
        res.status(201).json(newVideoGame);
    } catch (error) {
        // Manejando errores y enviando una respuesta de error si ocurre algún problema.
        res.status(400).json({ error: error.message });
    }
};

// Exportando los controladores para su uso en otras partes de la aplicación.
module.exports = {
    getVideogamesHandler,
    getVideogameByIdHandler,
    postVideogamesHandler,
    getVideogameByNameHandler
};