const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Habitacion = sequelize.define("Habitacion", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('disponible', 'ocupada', 'mantenimiento'),
            allowNull: false,
            defaultValue: 'disponible',
        },
    });

    Habitacion.associate = (models) => {
        Habitacion.hasMany(models.RegistroEstadia, { foreignKey: "habitacionId"});
    };

    return Habitacion;
};

