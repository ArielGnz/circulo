const { Usuario, Prestamo } = require("../db");

const allSociosDB = async () => {
    const res = await Usuario.findAll();
    return res;
}

const allPrestamoDB = async () => {
    const res = await Prestamo.findAll({
        include: {
            model: Usuario,
            attributes:["id", "apellido", "nombre", "dni", "cuil", "cbu"],
        },
    });
    return res;
}

module.exports = {allSociosDB, allPrestamoDB};