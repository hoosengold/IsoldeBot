//Import all required modules
const Discord = require("../node_modules/discord.js"),
    //fsLib = require('fs'),
    { Client } = require('pg');

var musicSuggestion = require('../bot.js');

require('dotenv').config();

//login details for the database
const client = new Client({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: 5432,
    database: process.env.database
})


//The function of the command
async function music(message, args) {
    try {
        //connect to the database
        await client.connect();
        console.log("Connected successfully.");

        //begin transaction
        await client.query("BEGIN");

        //extract video ID from the link
        musicSuggestion = args[0];
        const videoID = musicSuggestion.split('v=')[1];
        console.log(`videoID: ${videoID}`);

        //check if the entry is in the database
        var getAvail = await client.query("select * from music where link = $1", [getAvail]);
        console.log(`getResult: ${getAvail}`);

        if (getAvail == 0) { //if it isn't, add it and its ID, send message
            await client.query("insert music values ($1, $2)", [getAvail, videoID]);
            await message.channel.send("The song has been successfully added!");
            console.log(`Item added successfully.`);
        } else { //if it is, send message
            await message.channel.send("The song has already been suggested. Happy listening! :purple_heart:");
        }

        //end transaction
        await client.query("COMMIT");


    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    } finally {
        //end the connection
        await client.end();
        console.log("Disconnected succesfully.");
    }



}

//Export the module so that it can be used by bot.js
module.exports = music;