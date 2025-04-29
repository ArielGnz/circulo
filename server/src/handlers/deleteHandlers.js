const { eliminarPrestamoController } = require("../controllers/deleteControllers");

const eliminarPrestamoHandler = async (req, res) => {
    
    const { id } = req.params;

    try {
        await eliminarPrestamoController(id);
        res.status(200).json({message: "Prestamo eliminado correctamente."});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = { eliminarPrestamoHandler }