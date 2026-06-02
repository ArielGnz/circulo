const { Usuario, Prestamo, Habitacion, RegistroEstadia } = require("../db");

const allSociosDB = async () => {
  const res = await Usuario.findAll();
  return res;
};

const allPrestamoDB = async () => {
  const res = await Prestamo.findAll({
    include: [
      {
        model: Usuario,
        attributes: ["id", "apellido", "nombre", "dni", "cuil", "cbu"],
        required: false
      },
    ],
  });
  return res;
};

const allHabitacionesDB = async () => {
  const res = await Habitacion.findAll({
    order: [["numero", "ASC"]],
  });
  return res;
};

const allRegistroEstadiaDB = async () => {
  const res = await RegistroEstadia.findAll({
    include: [
      {
        model: Usuario,
        as: "Titular",
        attributes: ["id", "apellido", "nombre", "dni", "cuil", "cbu"],
        required: false,
      },
      {
        model: Habitacion,
        attributes: ["id", "numero", "estado"],
        required: false,
      },
    ],
    order: [["fechaHoraEntrada", "DESC"]],
  });
  return res;
};

module.exports = {
  allSociosDB,
  allPrestamoDB,
  allHabitacionesDB,
  allRegistroEstadiaDB,
};
