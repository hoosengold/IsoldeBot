module.exports = {
    name: 'getmusic',
    description: 'Get a music suggestion from the database.',
    aliases: ['listen', 'getsuggestion', 'whattolisten'],
    cooldown: 5,
    args: false,
    execute(message) {
        //Import all required modules
        const Discord = require("discord.js"),
            db = require("../../connections/database.js");

        const pool = db.pool

            //function of the command getMusic
            ; (async () => {
                //connect to the database
                const client = await pool.connect()
                console.log(`Connected successfully.`)

                try {

                    //get the row count
                    var rs = await db.query("select * from music")
                    var rowCount = rs.rows.length

                    //take a random number for a random row
                    var randomRow = Math.floor(Math.random() * rowCount + 1);
                    console.log(`randomRow: ${randomRow}`)

                    //select the song from the random row
                    const songSuggestion = await db.query("select link from music where rownumber = $1", [randomRow])
                        .then(result => {
                            //message the link 
                            message.reply({ content: `A random song was chosen for you! Enjoy suggestion *\u2116 ${randomRow}* by our fellow stream fams! :purple_heart: \n\n ${result.rows[0].link}`, allowedMentions: { repliedUser: true } })
                        })

                } finally {
                    console.log(`Music fetched successfully.`)
                }

            })().catch(err => {
                console.log(err.stack)
            });
        //delete the call message
        setTimeout(() => {
            message.delete()
                .catch(err => console.error(err))
            console.log(`Original message deleted.`)
        }, 5000);


    }
}