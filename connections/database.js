var pg = require('pg');
require('dotenv').config()

 //login details for the database
const config = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: 5432,
    database: process.env.database,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config)
module.exports = pool;