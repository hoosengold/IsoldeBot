module.exports = {
    name: 'event',
    description: 'Event handler for the quiz',
    execute(button) {
        const Discord = require('discord.js');
        const disbut = require('discord-buttons');
        const pool = require('../../../connections/database');
        const crypto = require('crypto');
        require('dotenv').config()

        let buttonID = button.id
        let questionID = buttonID.split('question')[1]
        let questionColumn = 'question' + questionID

        //throw an error if there are any idle clients
        pool.on('error', (err, client) => {
            console.error('Error on idle client', err)
            process.exit(-1)
        })

            ; (async () => {
                const client = await pool.connect()
                console.log("Connected successfully.")

                try {

                    var userID = await button.clicker.id
                    const secret = process.env.secret
                    const hasher = crypto.createHmac('sha256', secret)
                    var hashedID = hasher.update(userID).digest('hex')
                    userID = ''

                    //check if the entry is in the database
                    const getAvail = await client.query("select user_id from quiz_users where user_id = $1", [hashedID])
                        .then(async result => {
                            if (result.rows.length === 0) { //if it isn't, add it
                                await client.query("insert into quiz_users values ($1)", [hashedID])
                                console.log(`ID added successfully.`)
                            } else { //if it is, send message
                                console.log(`ID already added.`)
                            }

                            //print the link value
                            console.table(result.rows[0])
                        })
                        .catch(console.error())

                    let columnQuery = `ALTER TABLE quiz_users ADD COLUMN IF NOT EXISTS ${questionColumn} VARCHAR(20)`
                    await client.query(columnQuery)
                        .then(result => {
                            console.table(result)
                        })
                        .then(async result => {
                            let optionID = buttonID.split('question')[0]
                            let query = `update public.quiz_users set ${questionColumn}=$1 where user_id=$2`
                            await client.query(query, [optionID, hashedID])
                        })
                        .catch(console.error())

                } finally {
                    //release the client to the pool
                    client.release()
                    console.log("Client released succesfully.")
                }
            })().catch(err => {
                console.log(err.stack);
            });

    }
}