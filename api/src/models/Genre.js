const { DataTypes } = require('sequelize'); // Importa el objeto DataTypes desde sequelize, que se utiliza para definir los tipos de datos de los atributos en el modelo.

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', { // Define un modelo llamado 'genre' en la base de datos, con los siguientes atributos:

    id: { // Atributo 'id'
        type: DataTypes.INTEGER, // Tipo de dato INTEGER (número entero)
        autoIncrement: true, // Indica que el valor se incrementará automáticamente para cada nueva entrada
        primaryKey: true, // Indica que es la clave primaria de la tabla
        allowNull: false // No se permite un valor nulo para este atributo
      },
    name: { // Atributo 'name'
      type: DataTypes.STRING, // Tipo de dato STRING (cadena de caracteres)
      allowNull: false, // No se permite un valor nulo para este atributo
    },
    
  },
  {timestamps:false} // Configuración adicional para desactivar el registro de 'timestamps' (created_at y updated_at)
  );
}