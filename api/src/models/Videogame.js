const { DataTypes } = require('sequelize'); // Importa el objeto DataTypes desde sequelize, que se utiliza para definir los tipos de datos de los atributos en el modelo.

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', { // Define un modelo llamado 'videogame' en la base de datos, con los siguientes atributos:

    id: { // Atributo 'id'
      type: DataTypes.UUID, // Tipo de dato UUID (Universal Unique Identifier)
      defaultValue: DataTypes.UUIDV4, // Valor predeterminado generado automáticamente usando UUIDV4
      primaryKey: true, // Indica que es la clave primaria de la tabla
    
    },
    name: { // Atributo 'name'
      type: DataTypes.STRING, // Tipo de dato STRING (cadena de caracteres)
      allowNull: false, // No se permite un valor nulo para este atributo
    },
    description: { // Atributo 'description'
      type: DataTypes.TEXT, // Tipo de dato TEXT (texto largo)
      allowNull: false // No se permite un valor nulo para este atributo
    },
    platforms:{ // Atributo 'platforms'
      type: DataTypes.STRING, // Tipo de dato STRING (cadena de caracteres)
      allowNull: false // No se permite un valor nulo para este atributo
    },
    image:{ // Atributo 'image'
      type: DataTypes.STRING, // Tipo de dato STRING (cadena de caracteres)
      allowNull: false // No se permite un valor nulo para este atributo
    },
    released:{ // Atributo 'released'
      type: DataTypes.DATEONLY, // Tipo de dato DATEONLY (fecha sin hora)
      allowNull: false // No se permite un valor nulo para este atributo
    },
    rating:{ // Atributo 'rating'
      type: DataTypes.FLOAT, // Tipo de dato FLOAT (número decimal de precisión flotante)
      allowNull: false // No se permite un valor nulo para este atributo
    },
    genre:{ // Atributo 'genre'
      type: DataTypes.INTEGER, // Tipo de dato INTEGER (número entero)
      allowNull:false // No se permite un valor nulo para este atributo
    }
  },
  {timestamps:false} // Configuración adicional para desactivar el registro de 'timestamps' (created_at y updated_at)
  );
};