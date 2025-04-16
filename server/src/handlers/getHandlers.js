const { allSociosDB } = require("../controllers/getControllers");

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