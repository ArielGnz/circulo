module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cbu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cuil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Prestamo, { foreignKey: "usuarioId" });
  };

  return Usuario;
};
