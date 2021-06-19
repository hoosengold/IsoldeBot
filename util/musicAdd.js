//Import all required modules
const Discord = require("discord.js"),
    pool = require("../connections/database.js");

//variable to store the link
var musicSuggestion = require('../bot.js')

//throw an error if there are any idle clients
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})


//The function of the command addMusic
function musicAdd(message, args) {

    musicSuggestion = args[0];
    console.log(`musicSuggestion: ${musicSuggestion}`)

    //split the link to see if it's an youtbue link
    var yt = musicSuggestion.split('watch?')[0]
    console.log(`Website: ${yt}`)

    if (yt === "https://www.youtube.com/" || yt === "www.youtube.com/") {

        //extract video ID from the link
        const videoID = musicSuggestion.split('v=')[1]
        console.log(`videoID: ${videoID}`)

            //async function for the queries
            ; (async () => {

                //connect to the database
                const client = await pool.connect()
                console.log("Connected successfully.")

                try {
                    //begin transaction
                    //await client.query("BEGIN");

                    //check if the entry is in the database
                    const getAvail = await client.query("select * from music where link = $1", [musicSuggestion])

                    //get the row count
                    var rs = await client.query("select * from music")
                    var rowNumber = rs.rows.length + 1;

                    if (getAvail.rows.length === 0) { //if it isn't, add it and its ID, send message
                        await client.query("insert into music values ($1, $2, $3)", [musicSuggestion, videoID, rowNumber])
                        await message.channel.send(`The song has been successfully added! Thank you for the suggestion! :purple_heart: \n\n Total suggestions: ${rowNumber}`)
                        console.log(`Item added successfully.`)
                    } else { //if it is, send message
                        await message.channel.send("The song has already been suggested. Happy listening! :purple_heart:");
                        console.log(`Item already added.`)
                    }

                    //end transaction
                    //await client.query("COMMIT");

                } finally {
                    //release the client to the pool
                    await client.release()
                    console.log("Client released succesfully.")
                }


            })().catch(err => { //throw an error and rollback in case of an error
                //client.query("ROLLBACK");
                //console.log(`Rollback`);
                console.log(err.stack);
            });

    } else {
        //send a message if the link is not from youtube
        message.channel.send(`Only YouTube links (www.youtube.com) are accepted.`)
    }

    //Export the module so that it can be used by bot.js
}

module.exports = musicAdd;