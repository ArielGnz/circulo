const { Prestamo } = require("../db");

const crearPrestamoDB = async ({mes, importe, usuarioId}) => {
    
    if(!mes || !importe || !usuarioId) throw new Error("Faltan Datos");

    const nuevoPrestamo = await Prestamo.create({mes, importe, usuarioId});

    return nuevoPrestamo;

}

module.exports = { crearPrestamoDB };