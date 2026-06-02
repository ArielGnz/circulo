const {
  actualizarEstadoHabitacionDB,
  registrarSalidaEstadiaDB,
} = require("../controllers/putControllers");

const actualizarEstadoHabitacion = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const habitacion = await actualizarEstadoHabitacionDB(id, estado);
    res.status(200).json(habitacion);
  } catch (error) {
    console.error("Error al actualizar habitacion:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const registrarSalidaEstadia = async (req, res) => {
  const { id } = req.params;

  try {
    const registro = await registrarSalidaEstadiaDB(id, req.body);
    res.status(200).json(registro);
  } catch (error) {
    console.error("Error al registrar salida:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { actualizarEstadoHabitacion, registrarSalidaEstadia };
