const { Usuario, Prestamo } = require("../db");

const allSociosDB = async () => {
    const res = await Usuario.findAll();
    return res;
}

const allPrestamoDB = async () => {
    const res = await Prestamo.findAll();
    console.log(res);
    return res;
}

module.exports = {allSociosDB, allPrestamoDB};