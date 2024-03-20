import { GET_VIDEOGAMES, GET_VIDEOGAME, GET_SORTED_AZ } from "./actions"; // Importa las constantes de tipos de acciones desde el archivo de acciones

const initialState = { // Define el estado inicial
    videoGames: [], // Lista de videojuegos
    videoGame: [], // Videojuego individual
    sortedVideoGameAZ: [] // Lista de videojuegos ordenada alfabéticamente
};

const rootReducer = (state = initialState, action) => { // Define el reductor
    switch (action.type) { // Inicia un bloque switch basado en el tipo de acción

        case GET_VIDEOGAMES: // Caso para la acción de obtener todos los videojuegos
            return { ...state, videoGames: action.payload }; // Retorna el nuevo estado con la lista de videojuegos actualizada

        case GET_VIDEOGAME: // Caso para la acción de obtener un videojuego específico
            return { ...state, videoGame: action.payload }; // Retorna el nuevo estado con el videojuego individual actualizado

        case GET_SORTED_AZ: // Caso para la acción de obtener videojuegos ordenados alfabéticamente
            return { ...state, sortedVideoGameAZ: action.payload }; // Retorna el nuevo estado con la lista de videojuegos ordenada actualizada

        default: // Caso por defecto, cuando el tipo de acción no coincide con ninguno de los casos anteriores
            return { ...state }; // Retorna el estado actual sin cambios
    }
};

export default rootReducer; // Exporta el reductor para que pueda ser utilizado en la configuración del store de Redux
