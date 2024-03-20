import axios from 'axios'; // Importa la biblioteca Axios para realizar solicitudes HTTP

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"; // Define una constante para la acción de obtener todos los videojuegos
export const GET_VIDEOGAME = "GET_VIDEOGAME"; // Define una constante para la acción de obtener un videojuego específico
export const GET_SORTED_AZ = "GET_SORTED_AZ"; // Define una constante para la acción de obtener videojuegos ordenados alfabéticamente

export const getVideogame = (id) => { // Define una función de acción para obtener un videojuego específico por su ID
    return async function (dispatch) { // Retorna una función asíncrona que recibe dispatch como argumento
        const apiData = await axios.get(`http://localhost:3001/videogames/${id}`); // Realiza una solicitud GET al servidor para obtener un videojuego por su ID
        const videoGame = apiData.data; // Extrae los datos del videojuego de la respuesta de la API
        dispatch({ type: GET_VIDEOGAME, payload: videoGame }); // Despacha una acción con el tipo GET_VIDEOGAME y los datos del videojuego
    };
};

export const getVideogames = () => { // Define una función de acción para obtener todos los videojuegos
    return async function (dispatch) { // Retorna una función asíncrona que recibe dispatch como argumento
        const apiData = await axios.get("http://localhost:3001/videogames"); // Realiza una solicitud GET al servidor para obtener todos los videojuegos
        const videoGames = apiData.data; // Extrae los datos de los videojuegos de la respuesta de la API
        dispatch({ type: GET_VIDEOGAMES, payload: videoGames }); // Despacha una acción con el tipo GET_VIDEOGAMES y los datos de los videojuegos
    };
};

export const getVideogamesSorted = () => { // Define una función de acción para obtener todos los videojuegos ordenados alfabéticamente
    return async function (dispatch) { // Retorna una función asíncrona que recibe dispatch como argumento
        const apiData = await axios.get("http://localhost:3001/videogames"); // Realiza una solicitud GET al servidor para obtener todos los videojuegos
        const videoGames = apiData.data; // Extrae los datos de los videojuegos de la respuesta de la API
        const sortedVideoGameAZ = videoGames.sort((a, b) => a - b); // Ordena los videojuegos alfabéticamente
        dispatch({ type: GET_SORTED_AZ, payload: sortedVideoGameAZ }); // Despacha una acción con el tipo GET_SORTED_AZ y los videojuegos ordenados
    };
};
