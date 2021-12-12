const { Permissions, GuildMember, Guild } = require('discord.js'),
    index = require('../index'),
    messageCreate = require('../events/messageCreate')

const client = index.client

/**
 *
 * Additional methods that need the discord client.
 *
 * @module utils
 * @property {function} `isAdmin` Checks if a member is an admin.
 * @property {function} `fetchMembers` Fetches the ID's of all members in a guild.
 * @property {function} `member` Returns a GuildMember, that sent the message.
 * @property {function} `guild` Returns a Guild.
 *
 */

const utils = {
    /**
     *
     * Returns the Guild
     *
     * @function guild
     * @returns {Guild} Guild
     *
     */
    guild: function () {
        return client.guilds.cache.get(messageCreate.ID.guild)
    },

    /**
     *
     * Fetches a member from a guild with a known ID.
     *
     * @function member
     * @param {String} id The ID of the member that needs to be fetched
     * @returns {undefined | GuildMember} the fetched member or `undefined` if the ID is invalid or if no such user is found in the guild
     *
     */
    member: function (id) {
        const member = utils.guild().members.cache.get(id)
        return member ? member : console.log(`Couldn't find a member in this guild with this ID.`) && undefined
    },

    /**
     *
     * Checks if a member is an admin.
     *
     * @function isAdmin
     * @param {String} id The ID of the member, that sent the message; needed to be parsed to member().
     * @returns {boolean} `true` if the member is an admin.
     *
     */
    isAdmin: function (id) {
        const member = utils.member(id)
        return member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) ? true : false
    },

    /**
     *
     * Fetches the ID's of all members in a guild.
     *
     * @function `fetchMembers`
     * @property {string[]} `listOfUsers` String array with the user ID's.
     * @returns {string[]} `listOfUsers`
     *
     */
    fetchMembers: function () {
        //initialize guild
        const guild = utils.guild()

        let totalUsers = 0
        let listOfUsers = []
        guild.members.cache.forEach((member) => {
            totalUsers++
            listOfUsers.push(member.id.toString())
        })

        console.log(`Total fetched users: ${totalUsers}`)
        return listOfUsers
    },
}

module.exports = utils
