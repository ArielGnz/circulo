const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const syncApiDb = require('./src/controllers/api.js')
const PORT = process.env.PORT;

conn.sync({ force: true }).then(async() => {
  await syncApiDb();
  
  console.log("DB connect success");
  
  server.listen(PORT, () => {
   
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
