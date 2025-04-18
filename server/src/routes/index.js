const express = require('express');
const router = express.Router();
const { allSocios } = require("../handlers/getHandlers");

router.get("/socios", allSocios);
router.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = router;
