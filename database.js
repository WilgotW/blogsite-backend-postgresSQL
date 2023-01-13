const {Client} = require("pg");
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: process.env.DATABASE_PASSWORD,
    database: "blogsitedatabase"
})

module.exports = client;