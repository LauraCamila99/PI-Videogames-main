import Card from "../Card/Card"; // Importa el componente Card desde el archivo Card.js en el directorio superior
import style from "./CardsContainer.module.css"; // Importa los estilos CSS específicos para el componente CardsContainer
import { useSelector } from "react-redux"; // Importa el hook useSelector de react-redux

const CardsContainer = () => { // Define una función de componente llamada CardsContainer
    const videoGames = useSelector(state => state.videoGames); // Utiliza el hook useSelector para seleccionar el estado videoGames del store de Redux y lo almacena en la variable videoGames

    return (
        <div className={style.Container}> {/* Devuelve el JSX que representa el contenedor principal del componente CardsContainer */}
            {videoGames.map(videoGame => { // Itera sobre la lista de videojuegos
                return <Card // Por cada videojuego, renderiza un componente Card
                    id={videoGame.id} // Propiedad: id del videojuego
                    name={videoGame.name} // Propiedad: nombre del videojuego
                    image={videoGame.image} // Propiedad: imagen del videojuego
                    released={videoGame.released} // Propiedad: fecha de lanzamiento del videojuego
                    rating={videoGame.rating} // Propiedad: clasificación del videojuego
                    genre={videoGame.genre} // Propiedad: género del videojuego
                />
            })}
        </div>
    );
};

export default CardsContainer; // Exporta el componente CardsContainer para que pueda ser utilizado en otras partes de la aplicación
