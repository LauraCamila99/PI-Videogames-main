// Importando la función createGenre desde el archivo genresControllers.js.
const createGenre = require('../controllers/genresControllers');

//RUTA GET | /genres
// Definición de un controlador para obtener y cargar géneros en la base de datos.
const getGenresHandler = async (req, res) => {
    try {
        // Llamando a la función createGenre para cargar los géneros en la base de datos.
        const newGenre = await createGenre();

        // Enviando una respuesta HTTP con estado 201 (Created) y un mensaje de éxito si los géneros se cargaron exitosamente.
        res.status(201).json({
            success: true,
            message: 'Géneros cargados exitosamente en la base de datos'
        });
    } catch (error) {
        // Manejando errores y enviando una respuesta de error con estado 400 (Bad Request) si ocurre algún problema.
        res.status(400).json({ error: error.message });
    }
};

// Exportando el controlador para su uso en otras partes de la aplicación.
module.exports = getGenresHandler;