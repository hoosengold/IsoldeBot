module.exports = {
    name: 'addmusic',
    description: 'Add a music suggestion (YouTube link) to a database.',
    aliases: ['suggestmusic', 'addmusicsuggestion', 'addsuggestion', 'suggest'],
    cooldown: 5,
    args: true,
    execute(message, args) {
        //Import all required modules
        const Discord = require("discord.js"),
            db = require("../../connections/database.js");

        //variable to store the link
        var musicSuggestion = musicSuggestion = args[0];
        console.log(`musicSuggestion: ${musicSuggestion}`)

        //check if args is empty
        if (args[0] == null) {
            return message.reply('You forgot to paste the YouTube link. :yum:')
                .catch(err => console.log(err))
        }

        //split the link to see if it's an youtube link
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
                        //check if the entry is in the database
                        const getAvail = await db.query("select * from music where link = $1", [musicSuggestion])

                        //get the row count
                        var rs = await db.query("select * from music")
                        var rowNumber = rs.rows.length + 1;

                        if (getAvail.rows.length === 0) { //if it isn't, add it and its ID, send message
                            await db.query("insert into music values ($1, $2, $3)", [musicSuggestion, videoID, rowNumber])
                            await message.reply(`The song has been successfully added! Thank you for the suggestion! :purple_heart: \n\n Total suggestions: ${rowNumber}`)
                            console.log(`Item added successfully.`)
                        } else { //if it is, send message
                            await message.reply("The song has already been suggested. Happy listening! :purple_heart:");
                            console.log(`Item already added.`)
                        }
                    } finally {
                        console.log("Music add successfully.")
                    }


                })().catch(err => {
                    console.log(err.stack);
                });

        } else {
            //send a message if the link is not from youtube
            message.reply(`Only YouTube links (www.youtube.com) are accepted.`)
        }
    }
}