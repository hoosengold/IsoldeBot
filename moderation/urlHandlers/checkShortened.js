const { Message } = require('discord.js')

/**
 *
 * @param {Message} message Message object
 */
function checkShort(message) {
    if (message.content.includes('bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link')) {
        return true
    } else {
        return false
    }
}

module.exports = checkShort
