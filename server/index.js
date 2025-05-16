const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const syncApiDb = require('./src/controllers/api.js')
const PORT = process.env.PORT || 3001;

conn.sync().then(async() => {
  await syncApiDb();
  
  console.log("DB connect success");
  
  server.listen(PORT, () => {
   
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
