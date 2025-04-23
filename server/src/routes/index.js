const express = require('express');
const router = express.Router();
const { allSocios } = require("../handlers/getHandlers");

router.get("/socios", allSocios);


module.exports = router;
