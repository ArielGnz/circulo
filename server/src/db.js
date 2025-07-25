require('dotenv').config();
const { Sequelize} = require("sequelize");
const UsuarioModel = require('./models/UsuarioModel');
const PrestamoModel = require('./models/PrestamoModel');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//   logging: false, 
//   native: false, 
// });

// const sequelize = new Sequelize(DATABASE_URL, {
//   logging: false, 
//   native: false, 
// });

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Usuario, Prestamo } = sequelize.models;
if (Usuario.associate) Usuario.associate(sequelize.models);
if (Prestamo.associate) Prestamo.associate(sequelize.models);

// UsuarioModel(sequelize);
// PrestamoModel(sequelize);


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// Activity.belongsToMany(Country, {through: "activity_country"});
// Country.belongsToMany(Activity, {through: "activity_country"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, 
      // para importart la conexión { conn } = require('./db.js');
};