const { Message } = require('discord.js'),
    url = require('../../utils/regexURL')

/**
 *
 * @param {Message} message Message object
 */
//TODO implement url checking
async function checkUrl(message) {
    let urlString =
        message.content.match(url.main) || message.content.match(url.alphanumeric) || message.content.match(url.iPv4) || message.content.match(url.iPv6)

    if (urlString) {
        //remove all blank spaces
        urlString = urlString.toString().replace(/ /g, '')
        urlString = urlString.toString().replace(/,/g, '')
        console.log(`Test passed! url: ${urlString}`)
        return false
    }
}

module.exports = checkUrl
