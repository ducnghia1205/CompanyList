const PSQL = require('pg');
const urlDataBase = process.env.dataBaseURI || 'postgres://ducnghia';
const portDataBase = process.env.portDataBase || '5432';
const host = process.env.HOST || 'localhost';
const dbName = process.env.dataBaseName || 'companylist';


module.exports = {
  // postgres
  getPortGresClientWrite: () => {
    const connectionString = `${urlDataBase}@${host}:${portDataBase}/${dbName}`;
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
