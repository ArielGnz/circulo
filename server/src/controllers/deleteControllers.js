const { Prestamo } = require("../db");

const eliminarPrestamoController = async (id) => {
    const prestamo = await Prestamo.findByPk(id);

    if(!prestamo) throw new Error("Prestamo no encontrado.");

    await prestamo.destroy();
};

module.exports = { eliminarPrestamoController }