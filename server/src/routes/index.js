const express = require('express');
const router = express.Router();
const {
  allSocios,
  allPrestamo,
  allHabitaciones,
  allRegistrosEstadia,
} = require("../handlers/getHandlers");
const { crearPrestamo } = require("../handlers/postPrestamoHandlers");
const {
  crearHabitacion,
  crearRegistroEstadia,
} = require("../handlers/postHotelHandlers");
const {
  actualizarEstadoHabitacion,
  registrarSalidaEstadia,
} = require("../handlers/putHotelHandlers");
const { eliminarPrestamoHandler } = require('../handlers/deleteHandlers');

// Rutas de los GET
router.get("/socios", allSocios);
router.get("/listadoPrestamo", allPrestamo);
router.get("/habitaciones", allHabitaciones);
router.get("/registroEstadias", allRegistrosEstadia);

// Ruta POST para crear préstamo
router.post("/prestamos", crearPrestamo);
router.post("/habitaciones", crearHabitacion);
router.post("/registroEstadias", crearRegistroEstadia);

// Rutas PUT para hoteleria
router.put("/habitaciones/:id/estado", actualizarEstadoHabitacion);
router.put("/registroEstadias/:id/salida", registrarSalidaEstadia);

// Ruta para ELIMINAR prestamo
router.delete("/prestamos/:id", eliminarPrestamoHandler);

module.exports = router;


