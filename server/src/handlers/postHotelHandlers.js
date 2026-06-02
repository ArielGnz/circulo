const {
  crearHabitacionDB,
  crearRegistroEstadiaDB,
} = require("../controllers/postControllers");

const crearHabitacion = async (req, res) => {
  const { numero, estado } = req.body;

  try {
    if (!numero) {
      return res.status(400).json({ message: "Falta numero de habitacion" });
    }

    const habitacion = await crearHabitacionDB({ numero, estado });
    res.status(201).json(habitacion);
  } catch (error) {
    console.error("Error al crear habitacion:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const crearRegistroEstadia = async (req, res) => {
  try {
    const registro = await crearRegistroEstadiaDB(req.body);
    res.status(201).json(registro);
  } catch (error) {
    console.error("Error al crear registro de estadia:", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { crearHabitacion, crearRegistroEstadia };
