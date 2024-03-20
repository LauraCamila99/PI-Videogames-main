const axios = require('axios'); // Importa la biblioteca axios para realizar solicitudes HTTP.
const {KEY,URL} = process.env; // Obtiene la URL y la clave de la API desde las variables de entorno.
const {Genre} = require('../db.js'); // Importa el modelo Genre desde el archivo db.js.

// Función para crear géneros en la base de datos a partir de la API externa.
const createGenre = async () => {
    // Realiza una solicitud GET a la API externa para obtener los géneros.
    await axios.get(`${URL}/genres?key=${KEY}`)
    .then(async(response) => {
        const data = response.data.results; // Extrae los resultados de la respuesta.
        // Mapea los resultados para obtener solo los nombres de los géneros.
        const genres = data.map((genre) => genre.name);
        // Crea una array de objetos con el nombre de los géneros para ser insertados en la base de datos.
        const newGenres = await Genre.bulkCreate(genres.map((name) => ({ name })));
        console.log(data); // Imprime los datos obtenidos de la API en la consola.
    });
};

module.exports = createGenre; // Exporta la función createGenre para que pueda ser utilizada en otros archivos.