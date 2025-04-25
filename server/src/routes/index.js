const express = require('express');
const router = express.Router();
const { allSocios, allPrestamo } = require("../handlers/getHandlers");
const { crearPrestamo } = require("../handlers/postPrestamoHandlers");

router.get("/socios", allSocios);
router.get("/prestamosList", allPrestamo);
router.post("/prestamos", crearPrestamo);


module.exports = router;
