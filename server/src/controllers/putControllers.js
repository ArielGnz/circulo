const { Habitacion, RegistroEstadia } = require("../db");

const actualizarEstadoHabitacionDB = async (id, estado) => {
  if (!estado) throw new Error("El estado es obligatorio");

  const habitacion = await Habitacion.findByPk(id);
  if (!habitacion) throw new Error("Habitacion no encontrada");

  await habitacion.update({ estado });
  return habitacion;
};

const registrarSalidaEstadiaDB = async (id, data = {}) => {
  const registro = await RegistroEstadia.findByPk(id);
  if (!registro) throw new Error("Registro de estadia no encontrado");

  if (registro.fechaHoraSalida) {
    throw new Error("La salida ya fue registrada");
  }

  const fechaHoraSalida = data.fechaHoraSalida || new Date();
  const firmaSalida =
    typeof data.firmaSalida === "boolean" ? data.firmaSalida : true;

  await registro.update({
    fechaHoraSalida,
    firmaSalida,
  });

  const habitacion = await Habitacion.findByPk(registro.habitacionId);
  if (habitacion) {
    await habitacion.update({ estado: "disponible" });
  }

  return registro;
};

module.exports = { actualizarEstadoHabitacionDB, registrarSalidaEstadiaDB };
