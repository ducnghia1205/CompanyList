require('dotenv').config();
const PSQL = require('pg');
const urlDataBase = process.env.user;
const passwordDataBase = process.env.password;
const portDataBase = process.env.dbPort;
const host = process.env.HOST;
const dbName = process.env.database;

console.log('process.env.user: ', process.env.user);
module.exports = {
  // postgres
  getPortGresClientWrite: () => {
    const connectionString = `${urlDataBase}:${passwordDataBase}@${host}:${portDataBase}/${dbName}`;
    const client = new PSQL.Client({
      connectionString: connectionString
    });
    client.connect()
      .then(success => {
        //success.done(); // success, release the connection;
        console.log('connect to database postgres SQL success')
    })
      .catch(error => {
        console.log('ERROR:', error.message || error);
      });
    global.PSQL = client;
  }
};
