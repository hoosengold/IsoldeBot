const { Interaction } = require('discord.js'),
    db = require('../../../utils/database/database'),
    crypto = require('crypto')
require('dotenv').config()

module.exports = {
    name: 'event',
    description: 'Event handler for the quiz',
    /**
     *
     * @param {Interaction} interaction
     */
    execute(interaction) {
        let buttonID = interaction.component.customId
        let questionID = buttonID.split('question')[1]
        let questionColumn = 'question' + questionID

        ;(async () => {
            try {
                var userID = await interaction.member.id
                const secret = process.env.secret
                const hasher = crypto.createHmac('sha256', secret)
                var hashedID = hasher.update(userID).digest('hex')
                userID = ''

                await db
                    .getClient()
                    .then(async (client) => {
                        //check if the entry is in the database
                        let text = `select user_id from guild_${interaction.guildId}.quiz_users where user_id='${hashedID}'`
                        await client
                            .query(text)
                            .then(async (result) => {
                                if (result.rows.length === 0) {
                                    //if it isn't, add it
                                    text = `insert into guild_${interaction.guildId}.quiz_users values ('${hashedID}')`
                                    await client.query(text)
                                    console.log(`ID added successfully.`)
                                } else {
                                    //if it is, send message
                                    console.log(`ID already added.`)
                                }

                                //query the selected answer
                                let columnQuery = `ALTER TABLE guild_${interaction.guildId}.quiz_users ADD COLUMN IF NOT EXISTS ${questionColumn} VARCHAR(20)`
                                await client
                                    .query(columnQuery)
                                    .then(async () => {
                                        let query = `update guild_${interaction.guildId}.quiz_users set ${questionColumn}=$1 where user_id=$2`
                                        await client.query(query, [buttonID, hashedID])
                                    })
                                    .catch(console.error())

                                //release the client
                                client.release()
                                console.log(`Client released successfully.`)
                            })
                            .catch(console.error())
                    })
                    .catch(console.error())
            } finally {
                await interaction
                    .reply({
                        content: 'Answer submitted successfully!',
                        ephemeral: true,
                    })
                    .catch(console.error())
                console.log(`Button event executed successfully.`)
            }
        })().catch((err) => {
            console.log(err.stack)
        })
    },
}
