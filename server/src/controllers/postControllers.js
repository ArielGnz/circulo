const { Prestamo, Habitacion, RegistroEstadia, Usuario } = require("../db");

const crearPrestamoDB = async ({mes, importe, usuarioId, fecha}) => {
    
    if(!mes || !importe || !usuarioId) throw new Error("Faltan Datos");

    const nuevoPrestamo = await Prestamo.create({mes, importe, usuarioId, fecha});
    
    return nuevoPrestamo;
    
}

const crearHabitacionDB = async ({ numero, estado }) => {
  if (!numero) throw new Error("Falta numero de habitacion");

  const habitacionExistente = await Habitacion.findOne({ where: { numero } });
  if (habitacionExistente) throw new Error("La habitacion ya existe");

  const nuevaHabitacion = await Habitacion.create({
    numero,
    estado: estado || "disponible",
  });

  return nuevaHabitacion;
};

const crearRegistroEstadiaDB = async (payload) => {
  const { usuarioId, habitacionId, ...rest } = payload;

  if (!usuarioId || !habitacionId) {
    throw new Error("usuarioId y habitacionId son obligatorios");
  }

  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) throw new Error("Usuario no encontrado");

  const habitacion = await Habitacion.findByPk(habitacionId);
  if (!habitacion) throw new Error("Habitacion no encontrada");

  if (habitacion.estado === "ocupada") {
    throw new Error("La habitacion ya esta ocupada");
  }

  const nuevoRegistro = await RegistroEstadia.create({
    usuarioId,
    habitacionId,
    ...rest,
  });

  await habitacion.update({ estado: "ocupada" });

  return nuevoRegistro;
};

module.exports = { crearPrestamoDB, crearHabitacionDB, crearRegistroEstadiaDB };
