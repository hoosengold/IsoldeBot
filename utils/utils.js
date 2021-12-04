const { Permissions, GuildMember, Guild } = require('discord.js'),
    guildId = require('../index')

/**
 *
 * Additional methods that need the discord client.
 *
 * @module utils
 * @property {function} `isAdmin` Checks if a member is an admin.
 * @property {function} fetchMembers Fetches the ID's of all members in a guild.
 * @property {function} member Returns a GuildMember, that sent the message.
 * @property {function} guild Returns a Guild.
 *
 */

module.exports = {
    /**
     *
     * Checks if a member is an admin.
     *
     * @function isAdmin
     * @param {*} id The ID of the member, that sent the message; needed to be parsed to member().
     * @returns {boolean} `true` if the member is an admin.
     *
     */
    isAdmin(id) {
        //initialize member
        const member = member(id)

        if (member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return true
        } else {
            return false
        }
    },
    /**
     *
     * Fetches the ID's of all members in a guild.
     *
     * @function fetchMembers
     * @property {string[]} listOfUsers String array with the user ID's.
     * @returns {string[]} listOfUsers
     *
     */
    fetchMembers() {
        //initialize guild
        const guild = guild()

        let totalUsers = 0
        let listOfUsers = []
        guild.members.cache.forEach((member) => {
            totalUsers++
            listOfUsers.push(member.id.toString())
        })

        console.log(`Total fetched users: ${totalUsers}`)
        return listOfUsers
    },

    /**
     *
     * Fetches a member from a guild with a known ID.
     *
     * @function member
     * @param {*} id The ID of the member that needs to be fetched
     * @returns {undefined | GuildMember} the fetched member or `undefined` if the ID is invalid or if no such user is found in the guild
     *
     */

    member(id) {
        const guild = guild()

        const member = guild.members.cache.get(id)

        if (!member) {
            console.log(`Couldn't find a member in this guild with this ID.`)
            return undefined
        }
        return member
    },

    /**
     *
     * Returns the Guild
     *
     * @function guild
     * @returns {Guild} Guild
     *
     */

    guild() {
        const guild = client.guilds.cache.get(guildId)
        return guild
    },
}
