const { Guild } = require('discord.js')

module.exports = {
    name: 'guildUnavailable',
    once: false,
    /**
     *
     * @param {Guild} guild The guild that is unavaliable
     */
    execute(guild) {
        const time = new Date()
        console.log(`Guild __${guild.name}__ (${guild.id}) became unavailable at __${time.toUTCString()}__...`)
    },
}
