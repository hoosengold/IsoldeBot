//Import all required modules
const Discord = require("discord.js"),
    pool = require("../connections/database.js");


//check for idle clients
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})

//function of the command getMusic
function musicGet(message) {
    ; (async () => {
        //connect to the database
        const client = await pool.connect()
        console.log(`Connected successfully.`)

        try {
            //begin transaction
            //await client.query("BEGIN")

            //get the rownumber column populated if it isn't
            var rowCount = await client.query("select row_number () over (order by link) from music")
            console.log(`rowCount: ${rowCount}`)
            //take a random number for a random row
            var randomRow = Math.floor(Math.random() * rowCount + 1);

            //select the song from the random row
            const songSuggestion = await client.query("select link from music where rownumber = $1", [randomRow])

            //message the link 
            message.channel.send(`A random song was chosen for you! Enjoy the suggestion by our fellow stream fams! :purple_heart: ${songSuggestion}`)

            //commit transaction
            //await client.query("COMMIT")

        } finally {
            //release the client to the pool
            await client.release()
            console.log(`Client released successfully.`)
        }

    })().catch(err => { //throw an error and rollback in case of an error
        //client.query("ROLLBACK")
        //console.log(`Rollback`)
        console.log(err.stack)
    });
}

//export the function
module.exports = musicGet;