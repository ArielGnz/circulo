// const express = require("express");
// const router = require("./routes/index");
// const morgan = require("morgan");
// const cors = require("cors");

// const server = express();

// server.use(morgan("dev"));
// server.use(express.json());
// server.use(cors());
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); 
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


// server.use(router);

// module.exports = server;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index");  // Importas las rutas desde index.js

const server = express();

// Middleware para loguear peticiones
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

// Middleware CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Usar las rutas del router
server.use(router);

module.exports = server;

