const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RegistroEstadia = sequelize.define("RegistroEstadia", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // --- DATOS DE ENTRADA ---
    fechaHoraEntrada: {
      type: DataTypes.DATE, // Reemplaza día, mes, año y hora en un solo campo
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    procedencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cantidadSabanas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    celularContacto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    posibleEgreso: {
      type: DataTypes.DATEONLY, // Solo la fecha estimada
      allowNull: true,
    },
    firmaEntrada: {
      type: DataTypes.BOOLEAN, // O STRING si guardas un hash/path de firma digital
      defaultValue: true,
    },
    
    // --- DATOS DEL ACOMPAÑANTE (Si no es el titular) ---
    // Nota: Si viaja el titular solo, estos campos quedan vacíos
    acompananteDni: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acompananteEdad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    acompananteParentesco: {
      type: DataTypes.STRING, // Ej: "Hijo/a", "Cónyuge"
      allowNull: true,
    },

    // --- DATOS DE SALIDA ---
    // Al check-in estos campos nacen vacíos (allowNull: true)
    fechaHoraSalida: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    firmaSalida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  RegistroEstadia.associate = (models) => {
    // Se asocia con el Socio Titular
    RegistroEstadia.belongsTo(models.Usuario, { foreignKey: "usuarioId", as: "Titular" });
    // Se asocia con la Habitación
    RegistroEstadia.belongsTo(models.Habitacion, { foreignKey: "habitacionId" });
  };

  return RegistroEstadia;
};