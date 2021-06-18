//Import all required modules
const Discord = require("../node_modules/discord.js"),
    //fsLib = require('fs'),
    { Pool } = require('pg');

//variable to store the link
var musicSuggestion = require('../bot.js')

require('dotenv').config()

//login details for the database
const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: 5432,
    database: process.env.database,
    ssl: { rejectUnauthorized: false }
})



//throw an error if there are any idle clients
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})


//The function of the command
function musicAdd(message, args) {
    //async function for the queries
    ; (async () => {

        //connect to the database
        client = await pool.connect()
        console.log("Connected successfully.")

        try {
            //begin transaction
            await client.query("BEGIN");

            //extract video ID from the link
            musicSuggestion = args[0];
            console.log(`musicSuggestion: ${musicSuggestion}`)
            const videoID = musicSuggestion.split('v=')[1]
            console.log(`videoID: ${videoID}`)

            //check if the entry is in the database
            const getAvail = await client.query("select * from music where link = $1", [musicSuggestion])

            if (getAvail.rows.length === 0) { //if it isn't, add it and its ID, send message
                await client.query("insert into music values ($1, $2)", [musicSuggestion, videoID])
                await message.channel.send("The song has been successfully added!")
                console.log(`Item added successfully.`)
            } else { //if it is, send message
                await message.channel.send("The song has already been suggested. Happy listening! :purple_heart:");
                console.log(`Item already added.`)
            }

            //end transaction
            await client.query("COMMIT");

        } finally {
            //release the client to the pool
            await client.release()
            console.log("Client released succesfully.")
        }


    })().catch(err => { //throw an error and rollback in case of an error
        client.query("ROLLBACK");
        console.log(`Rollback`);
        console.log(err.stack);
    });
}

//Export the module so that it can be used by bot.js
module.exports = musicAdd;