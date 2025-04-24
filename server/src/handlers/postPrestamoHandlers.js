const { crearPrestamoDB } = require("../controllers/postControllers/");

const crearPrestamo = async (req, res) => {

    const { importe, mes, usuarioId, fecha } = req.body

    try {
        
        if(!importe || !mes || !usuarioId){
            return res.status(400).json({message: "Faltan datos obligatorios"})
        }

        const prestamo = await crearPrestamoDB({mes, importe, usuarioId, fecha});

        res.status(201).json(prestamo);

    } catch (error) {
        console.log("Error al crear el prestamo:", error.message);
        res.status(400).json({message: error.message});
    }
}

module.exports = { crearPrestamo }