const { Router } = require('express');
const videogamesRouter = Router();
//// Se utilizan los handelrs que se realizaron para lo que tiene que ver con Videogames
//import handlers
const {
    getVideogamesHandler,
    getVideogameByIdHandler,
    postVideogamesHandler,
    getVideogameByNameHandler
} = require ('../handlers/videogamesHandlers.js')

// Get Routes.
// Definiendo las rutas GET.

//GET | /videogames RUTA Y PATH
//Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
// Cuando se realiza una solicitud GET a la raíz de esta ruta (/), se ejecuta el controlador getVideogamesHandler.
videogamesRouter.get('/',getVideogamesHandler);

//GET | /videogames/:idVideogame
//Esta ruta devuelve un objeto con la información pedida en el detalle de un videojuego.
// Cuando se realiza una solicitud GET con un ID en la ruta (/id), se ejecuta el controlador getVideogameByIdHandler.
videogamesRouter.get('/:id',getVideogameByIdHandler);

//GET | /videogames/name?="..."
//Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Cuando se realiza una solicitud GET con un name en la ruta (/name), se ejecuta el controlador getVideogameByNameHandler
videogamesRouter.get('/videogames/name', getVideogameByNameHandler);

// Post Routes.
// Definiendo las rutas POST.

// POST | /videogames
//Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Cuando se realiza una solicitud POST a la raíz de esta ruta (/), se ejecuta el controlador postVideogamesHandler.
videogamesRouter.post('/', postVideogamesHandler);

module.exports = videogamesRouter;