const fs = require('fs');
const path = require('path');
const { Usuario } = require('../db');

const FILE_PATH = path.join(__dirname, '../../server/db.json');


const syncJsonDb = async () => {
    try {
        // Leer y parsear el archivo JSON
        const jsonData = fs.readFileSync(FILE_PATH, 'utf-8');
        const usuarios = JSON.parse(jsonData);

        // Mapear los datos necesarios
        const mapUsuarios = usuarios.map(usuario => {
            return {
                apellido: usuario.apellido,
                nombre: usuario.nombre,
                dni: usuario.dni,
                cbu: usuario.cbu,
                cuil: usuario.cuil
            };
        });

        // Insertar los datos en la base de datos
        await Usuario.bulkCreate(mapUsuarios);
        console.log('Usuarios cargados a la base de datos correctamente');
    } catch (error) {
        console.error('Error en la carga de usuarios:', error);
    }
};

module.exports = syncJsonDb;
