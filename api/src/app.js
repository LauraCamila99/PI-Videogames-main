//DECLARAR VARIABLES
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const routes = require('./routes/index.js');
 
 //Se está requiriendo el archivo db.js, que  contiene la configuración y la conexión a la base de datos de la aplicación.
  require('./db.js');
// Se crea una instancia de Express y se asigna a la variable server. Esta instancia será el objeto principal 
//que se utilizará para configurar las rutas, middlewares y otros aspectos del servidor Express.
  const server = express();

//VAMOS A MODIFICIAR EL OBJETO SERVER CON LAS RUTAS Y MIDDLEWARES
//MIDELWARES ONLY
  // Establece el nombre del servidor Express como "API".
  server.name = 'API';
  // permiten al servidor Express analizar y procesar cuerpos de solicitud tanto en formato codificado en URL 
  server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  //como en formato JSON, con un límite máximo de tamaño de 50 megabytes para cada tipo de solicitud.
  server.use(bodyParser.json({ limit: '50mb' }));
  //analizar las cookies adjuntas en las solicitudes entrantes y acceder a sus valores en tus rutas de Express
  server.use(cookieParser());
  //Esto es una funcion  que registra las solicitudes en el formato de desarrollo predefinido, que incluye
  // información como el método HTTP, la URL solicitada, el código de estado de respuesta y el tiempo de respuesta.
  server.use(morgan('dev')); 
  //configura el servidor Express para permitir solicitudes CORS desde el dominio http://localhost:3000, 
  //permitiendo métodos HTTP específicos y encabezados específicos en las solicitudes. 
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  
//ROUTES
  server.use('/', routes);

//  MANEJO DE ERROR Error catching endware.
  server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

//EXPORTAMOS EL OBJETO SERVER
  module.exports = server;
