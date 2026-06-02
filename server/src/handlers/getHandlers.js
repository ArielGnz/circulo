const {
  allSociosDB,
  allPrestamoDB,
  allHabitacionesDB,
  allRegistroEstadiaDB,
} = require("../controllers/getControllers");

const allSocios = async(req, res) => {
    
    try {
        
        const socios = await allSociosDB();

        if(socios.length === 0){
            return res.status(404).json({message: "No se encontraron socios"})
        }
        
        res.status(200).json(socios);

    } catch (error) {
        
        console.error("Error al obtener los socios", error);
        res.status(500).json({message: "Error al obtener los socios"})

    }
}

const allPrestamo = async (req, res) => {
    
    try {
        const prestamos = await allPrestamoDB();
        console.log(prestamos);
        if (prestamos.length === 0) {
            return res.status(400).json({ message: "No se encontraron prestamos" });
        }
        res.status(200).json(prestamos);

    } catch (error) {
        console.error("Error al obtener los prestamos:", error.message, error.stack);
        res.status(500).json({message: "Error al obtener los prestamos", error:error.message});
    }
}

const allHabitaciones = async (req, res) => {
  try {
    const habitaciones = await allHabitacionesDB();
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Error al obtener habitaciones", error: error.message });
  }
};

const allRegistrosEstadia = async (req, res) => {
  try {
    const registros = await allRegistroEstadiaDB();
    res.status(200).json(registros);
  } catch (error) {
    console.error(
      "Error al obtener registros de estadia:",
      error.message,
      error.stack
    );
    res.status(500).json({
      message: "Error al obtener registros de estadia",
      error: error.message,
    });
  }
};

module.exports = {
  allSocios,
  allPrestamo,
  allHabitaciones,
  allRegistrosEstadia,
};