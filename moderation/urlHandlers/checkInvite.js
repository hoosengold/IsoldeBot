const { Message } = require('discord.js'),
    utils = require('../../utils/utils'),
    url = require('../../utils/regexURL'),
    messageCreate = require('../../events/messageCreate')

/**
 *
 * @description Checks if the message with the invite link has to be deleted
 * @param {Message} message Message object
 * @returns `true` when the message has to be deleted
 */
function checkInvite(message) {
    if (message.content.match(url.invite)) {
        if (utils.isAdmin(messageCreate.ID.member)) {
            console.log('Invite link posted by an admin')
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}

module.exports = checkInvite
