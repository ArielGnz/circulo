
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primayKey: true,
    },
    npmbre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cbu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Prestamo, { foreingKey: "usuarioId" });
  };

  return Usuario;
};
