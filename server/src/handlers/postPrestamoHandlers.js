const { crearPrestamoDB } = require("../controllers/postControllers/");

const crearPrestamo = async (req, res) => {
    try {
        
        const {mes, importe, usuarioId} = req.body;

        const nuevo = await crearPrestamoDB({mes, importe, usuarioId});

        res.status(201).json(nuevo);

    } catch (error) {
        console.log("Error al crear el prestamo:", error.message);
        res.status(400).json({message: error.message});
    }
}

module.exports = { crearPrestamo }