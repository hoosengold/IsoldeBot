//Import all required modules
const Discord = require('../node_modules/discord.js'),
    emojiArray = require('./pollutil/emojiArray.js');

function poll(message, args) {
    //format the input
    const squigglyRegex = RegExp(/{(.*?)}/),
        pollOptions = RegExp(/\[[^[]+\]/g),
        pollParameters = args.join(' '),
        pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;

    console.log(squigglyRegex.exec(pollParameters));

    //checks if the command has title
    if (!pollTitle) {
        return message.channel.send('No poll title specified. Type `*help` for more info.')
            .catch(err => console.log(err));
    }

    pollParameters.replace(`{${pollTitle}}`, '')
    const pollsArray = pollParameters.match(pollOptions)


    //checks if the command has options and if they are more than 20
    if (!pollsArray) {
        return message.channel.send('No poll options specified. Type `*help` for more info.')
            .catch(err => console.log(err));
    } else if (pollsArray.length > 20) {
        return message.channel.send('Max. 20 poll options allowed.')
            .catch(err => console.log(err));
    }

    //creates the poll message
    let i = 0;
    const pollMessage = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

    //poll message format and content
    const embed = {
        color: 'PURPLE',
        title: pollTitle,
        description: pollMessage,
    }


    //array with the reactions amojis
    const reactions = ['🇦',
        '🇦',
        '🇧',
        '🇨',
        '🇩',
        '🇪',
        '🇫',
        '🇬',
        '🇭',
        '🇮',
        '🇯',
        '🇰',
        '🇱',
        '🇲',
        '🇳',
        '🇴',
        '🇵',
        '🇶',
        '🇷',
        '🇸',
        '🇹']

    //messages the poll and then reacts to it with the reactions[]
    const msg = message.channel.send({ embed: embed }).catch(err => console.log(err))
        .then(function (message) {
            for (let j = 0; j < i + 1; j++) {
                message.react(reactions[j])
            }
        });
}

module.exports = poll;