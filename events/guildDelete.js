const db = require('../utils/database/database'),
    { Guild } = require('discord.js')

module.exports = {
    name: 'guildDelete',
    once: false,
    /**
     *
     * @param {Guild} guild
     */
    execute(guild) {
        db.getClient().then((client) => {
            let text = `DROP SCHEMA IF EXISTS guild_${guild.id} CASCADE;`
            client.query({
                text: text,
            })
            client.release()
        })
    },
}
