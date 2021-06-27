module.exports = {
    name: 'getmusic',
    description: 'Get a music suggestion from the database.',
    aliases: ['listen', 'getsuggestion', 'whattolisten'],
    cooldown: 5,
    args: false,
    execute(message) {
        //Import all required modules
        const Discord = require("discord.js"),
            pool = require("../../connections/database.js");

        //check for idle clients
        pool.on('error', (err, client) => {
            console.error('Error on idle client', err)
            process.exit(-1)
        })

            //function of the command getMusic
            ; (async () => {
                //connect to the database
                const client = await pool.connect()
                console.log(`Connected successfully.`)

                try {
                    //begin transaction
                    //await client.query("BEGIN")

                    //get the row count
                    var rs = await client.query("select * from music")
                    var rowCount = rs.rows.length

                    //take a random number for a random row
                    var randomRow = Math.floor(Math.random() * rowCount + 1);
                    console.log(`randomRow: ${randomRow}`)

                    //select the song from the random row
                    const songSuggestion = await client.query("select link from music where rownumber = $1", [randomRow])
                        .then(result => {
                            //print the link value
                            console.table(result.rows[0])
                            //message the link 
                            message.reply(`A random song was chosen for you! Enjoy suggestion *\u2116 ${randomRow}* by our fellow stream fams! :purple_heart: \n\n ${result.rows[0].link}`)
                        })

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
}