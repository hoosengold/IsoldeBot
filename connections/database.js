var pg = require('pg');
require('dotenv').config()

/**
 * 
 * Login details for connecting to the database.
 * 
 * @memberof Database
 * @instance
 * 
 * @constant {object} config Config details for connecting to the database.
 * @property {string} user Database user;
 * @property {string} password Password for the user;
 * @property {string} host Host of the database;
 * @property {number} port Port;
 * @property {string} database Database identifier;
 * @property {boolean} rejectUnauthorized Requires ssl for connection;
 * @property {number} max Max. amount of simultaneous connections;
 * @property {number} idleTimeoutMillis Max. duration of idle connections.
 *
 * */
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

/**
 * 
 * Help methods for connecting to a pool and creating clients, making queries and tracking down/resolving client errors.
 * 
 * @module database
 * @namespace Database
 * 
 * @property {function} query Execute the actual query and log the duration of the query.
 * @property {function} getClient Gets executed if an error on idle client is thrown. It logs the last query by that client and releases the client afterwards.
 * 
 */

module.exports = {
    
    /**
     * 
     * Execute the actual query and log the duration of the query.
     * 
     * @memberof Database
     * @instance
     * 
     * @async
     * @param {string} text Text of the query that needs to be executed;
     * @param {*} [params] Possible parameters of the query that needs to be executed.
     * @returns Returns the result of the query.
     */

    async query(text, params) {
        const start = Date.now()
        const res = await pool.query(text, params)
        const duration = Date.now() - start
        console.log(`query executed`, { text, duration, rows: res.rowCount })
        return res
    },

    /**
     * Gets executed if an error on idle client is thrown. It logs the last query by that client and releases the client afterwards.
     * 
     * @memberof Database
     * @instance
     * 
     * @async
     * @returns Returns the released client.
     */

    async getClient() {
        const client = await pool.connect()
        const query = client.query
        const release = client.release

        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
            console.error(`The last executed query on this client was: ${client.lastQuery}`)
        }, 5000)

        client.query = (...args) => {
            client.lastQuery = args
            return query.apply(client, args)
        }

        client.release = () => {
            clearTimeout(timeout)
            client.query = query
            client.release = release
            return release.apply(client)
        }
        return client
    },
}
