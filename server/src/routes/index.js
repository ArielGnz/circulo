const express = require('express');
const router = express.Router();
const { allSocios } = require("../handlers/getHandlers");
const { crearPrestamo } = require("../handlers/postPrestamoHandlers");

router.get("/socios", allSocios);
router.post("/prestamos", crearPrestamo);


module.exports = router;
