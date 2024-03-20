const { Op } = require('sequelize'); // Importa el operador de Sequelize para realizar consultas complejas.
const { Videogame, Genre } = require('../db.js'); // Importa el modelo de Videogame y Genre desde el archivo db.js.
const axios = require ('axios'); // Importa axios para hacer solicitudes HTTP.
const {KEY,URL} = process.env; // Obtiene la URL y la clave de la API desde las variables de entorno.

// Controlador para obtener todos los videojuegos.
const getAllGames = async () => {
    const dbVideogames = await Videogame.findAll(); // Obtiene todos los videojuegos de la base de datos.
    const apiVideogamesRaw = (await axios.get(`${URL}/games?key=${KEY}`)).data.results; // Obtiene todos los videojuegos desde la API.
    const apiVideogames = cleanArray(apiVideogamesRaw); // Limpia los datos recibidos de la API.
    return [...dbVideogames,...apiVideogames]; // Retorna la combinación de videojuegos de la base de datos y de la API.

};  

// Controlador para obtener un videojuego por su id.
const  getVideogameById = async (id,source) => {
    // Decide si obtener el videojuego desde la API o desde la base de datos.
    const response = 
    source === "api"
    ? await axios.get(`${URL}/games/${id}?key=${KEY}`) // Obtiene el videojuego desde la API.
    : await Videogame.findByPk(id); // Obtiene el videojuego desde la base de datos.
    
    if (source === "api") { // Si la fuente es la API, realiza algunas transformaciones en los datos.
        const { id,name, description, released, platforms,background_image,rating,genres} = response.data;
        const platformsName = platforms.map(data => data.platform.name);
        genresName = genres.map(data=>data.name); 
        return { id,name, description, released, platformsName,background_image,rating,genresName};
    } else {
        return response; // Si la fuente no es la API, devuelve la respuesta tal cual.
    }
};


// Controlador para obtener videojuegos por nombre.
const getVideogameByName = async (name) => {
    // Buscar en la base de datos
    const dbVideogames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%` // Realiza una búsqueda insensible a mayúsculas/minúsculas en la base de datos.
            }
        }
    });

    // Si se encontraron menos de 15 videojuegos en la base de datos, buscar en la API
    if (dbVideogames.length < 15) {
        const apiVideogamesRaw = (await axios.get(`${URL}/games?search=${name}&key=${KEY}&pageSize=15`)).data.results; // Obtiene videojuegos desde la API que coincidan con el nombre.
        const apiVideogames = cleanArray(apiVideogamesRaw); // Limpia los datos recibidos de la API.
        
        // Filtra los videojuegos de la API que no están en la base de datos
        const filteredApi = apiVideogames.filter((apiGame) => !dbVideogames.some((dbGame) => dbGame.name.toLowerCase() === apiGame.name.toLowerCase()));

        // Combina los videojuegos de la base de datos y de la API
        const combinedResults = [...dbVideogames, ...filteredApi];

        // Retorna los primeros 15 resultados
        return combinedResults.slice(0, 15);
    } else {
        // Si se encontraron al menos 15 videojuegos en la base de datos, retornar los primeros 15
        return dbVideogames.slice(0, 15);
    }
};
// const getVideogameByName = async (name) => {
//     const dbVideogames = await Videogame.findAll({
//         where: {
//             name: {
//                 [Op.iLike]: `%${name}%` // Realiza una búsqueda insensible a mayúsculas/minúsculas en la base de datos.
//             }
//         },
//         limit: 15 // Limita el resultado a 15 videojuegos.
//     });
//     const apiVideogamesRaw = (await axios.get(`${URL}/games?search=${name}&key=${KEY}&pageSize=15`)).data.results; // Obtiene videojuegos desde la API que coincidan con el nombre.
//     const apiVideogames = cleanArray(apiVideogamesRaw); // Limpia los datos recibidos de la API.
//     const filteredApi = apiVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase())); // Filtra los videojuegos de la API que coinciden con el nombre.
//     const result = [...dbVideogames, ...filteredApi]; // Combina los videojuegos de la base de datos y de la API.
//     if (result.length === 0) {
//         return { message: `No se encontró ningún videojuego que coincida con: '${name}'.` }; // Mensaje si no se encuentra ningún videojuego.
//     }
//     return result.slice(0, 15); // Retorna los primeros 15 resultados.
// };


// Controlador para crear un nuevo videojuego en la base de datos.
const createVideoGame = async (name,description,platforms,image,released,rating,genre) => {
    return await Videogame.create({name,description,platforms,image,released,rating,genre});
};


// Función para limpiar los datos recibidos de la API.
const cleanArray = (arr) => {
    return arr.map(elem => {
        const platforms = [elem.platforms, elem.parent_platforms]
            .flatMap(platform => platform.map(p => p.platform.name))
            .filter((name, index, arr) => arr.indexOf(name) === index);
        const genres = elem.genres.map(g => g.id);
        return {
            id: elem.id,
            name: elem.name,
            description: elem.description,
            platform: platforms,
            image: elem.background_image,
            released: elem.released,
            rating: elem.rating,
            genre: genres,
            created: false
        };
    });
};



// Exporta los controladores para que puedan ser utilizados en otros archivos.
module.exports = {
    createVideoGame,
    getVideogameById,
    getAllGames,
    getVideogameByName
};
