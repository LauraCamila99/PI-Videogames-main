import styles from './Card.module.css'; // Importa los estilos CSS específicos para este componente desde el archivo 'Card.module.css'.
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para crear enlaces internos en la aplicación.

const Card = (props) => { // Declara un componente funcional llamado Card que recibe props como argumento.
    const id = props.id; // Extrae el ID de las props recibidas.

    return (
        <div className={styles.Container}> {/* Crea un contenedor con la clase CSS 'Container' definida en el archivo de estilos. */}
            <Link to={`/detail/${id}`}> {/* Crea un enlace interno que redirige a la ruta '/detail/:id', donde ':id' es el ID del juego. */}
                <button className={styles.button}>{props.name}</button> {/* Crea un botón con la clase CSS 'button' definida en el archivo de estilos y muestra el nombre del juego. */}
            </Link>
            <img className={styles.image} src={props.image} alt="" /> {/* Muestra una imagen del juego con la clase CSS 'image' definida en el archivo de estilos. */}
            <p className={styles.text}>Release date:{props.released}</p> {/* Muestra la fecha de lanzamiento del juego con la clase CSS 'text' definida en el archivo de estilos. */}
            <p className={styles.text}>Genre: {props.genre}</p> {/* Muestra la clasificación del juego con la clase CSS 'text' definida en el archivo de estilos. */}
        </div>
    );
};

export default Card; // Exporta el componente Card para que pueda ser utilizado en otros archivos de la aplicación.
