const checkUrl = require('../moderation/urlHandlers/checkUrl'),
    checkInvite = require('../moderation/urlHandlers/checkInvite'),
    checkShort = require('../moderation/urlHandlers/checkShortened'),
    { Message } = require('discord.js')

/**
 * Checks if the message contains a link. If the link is a discord invite, that is not posted by a moderator, a shortened link or a possibly
 * malicious link, the function returns `true`
 * @async
 * @param {Message} message
 * @returns {boolean}
 */

async function matchUrl(message) {
    if (checkInvite(message)) {
        console.log(`Discord invite link deleted`)
        message.channel.send(`**Only moderators can post Discord invite links!**`)
        return true
    }

    if (checkShort(message)) {
        console.log(`Shortened link deleted.`)
        message.channel.send(`**No shortened links allowed!**`)
        return true
    }

    if (await checkUrl(message)) {
        console.log(`Possibly malicious link detected and deleted.`)
        return true
    }

    return false
}

module.exports = matchUrl
