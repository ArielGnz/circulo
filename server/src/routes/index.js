// const express = require('express');
// const router = express.Router();
// const { allSocios, allPrestamo } = require("../handlers/getHandlers");
// const { crearPrestamo } = require("../handlers/postPrestamoHandlers");

// router.get("/socios", allSocios);
// router.get("/listadoPrestamo", allPrestamo);
// router.post("/prestamos", crearPrestamo);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { allSocios, allPrestamo } = require("../handlers/getHandlers");
const { crearPrestamo } = require("../handlers/postPrestamoHandlers");

// Rutas de los GET
router.get("/socios", allSocios);
router.get("/listadoPrestamo", allPrestamo);

// Ruta POST para crear préstamo
router.post("/prestamos", crearPrestamo);

module.exports = router;


