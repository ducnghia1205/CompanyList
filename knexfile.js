require(`dotenv`).config();
const PSQL = require(`pg`);
const urlDataBase = process.env.user;
const passwordDataBase = process.env.password;
const portDataBase = process.env.dbPort;
const host = process.env.HOST;
const dbName = process.env.database;

module.exports = {
  development: {
    client: "postgresql",
    connection: `${urlDataBase}:${passwordDataBase}@${host}:${portDataBase}/${dbName}`,
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    }
  }
}
