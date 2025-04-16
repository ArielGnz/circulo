const { Usuario } = require("../db");

const allSociosDB = async () => {
    const res = await Usuario.findAll();
    return res;
}

module.exports = {allSociosDB};