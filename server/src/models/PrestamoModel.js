
module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define("Prestamo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    importe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
  });

  Prestamo.associate = (models) => {
    Prestamo.belongsTo(models.Usuario, { foreignKey: "usuarioId" });
  };

  return Prestamo;
};
