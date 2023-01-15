const {Client} = require("pg");
const client = new Client(process.env.POSTGRESQL_CONNECTION_URL)

module.exports = client;