const { Usuario } = require("../db");

const allSociosDB = async () => {
    const res = await Usuario.findAll();
}

module.exports = {allSociosDB};