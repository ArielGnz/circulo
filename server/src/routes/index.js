const express = require('express');
const router = express.Router();
const { allSocios, allPrestamo } = require("../handlers/getHandlers");
const { crearPrestamo } = require("../handlers/postPrestamoHandlers");
const { eliminarPrestamoHandler } = require('../handlers/deleteHandlers');

// Rutas de los GET
router.get("/socios", allSocios);
router.get("/listadoPrestamo", allPrestamo);

// Ruta POST para crear préstamo
router.post("/prestamos", crearPrestamo);

// Ruta para ELIMINAR prestamo
router.delete("/prestamo/:id", eliminarPrestamoHandler);

module.exports = router;


