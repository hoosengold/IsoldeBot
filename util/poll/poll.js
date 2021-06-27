module.exports = {
    name: 'poll',
    description: 'Provide a poll with up to 20 options and reactions for answers.',
    //aliases: [],
    cooldown: 5,
    args: true,
    execute(message, args) {
        //Import all required modules
        const Discord = require('discord.js'),
            emojiArray = require('./pollutil/emojiArray.js');

        //format the input
        const squigglyRegex = RegExp(/{(.*?)}/),
            pollOptions = RegExp(/\[[^[]+\]/g),
            pollParameters = args.join(' '),
            pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;

        console.log(squigglyRegex.exec(pollParameters));

        //checks if the command has title
        if (!pollTitle) {
            return message.reply('No poll title specified. Type `*help` for more info.')
                .catch(err => console.log(err));
        }

        pollParameters.replace(`{${pollTitle}}`, '')
        const pollsArray = pollParameters.match(pollOptions)

        //checks if the command has options and if they are more than 20
        if (!pollsArray) {
            return message.reply('No poll options specified. Type `*help` for more info.')
                .catch(err => console.log(err));
        } else if (pollsArray.length > 20) {
            return message.reply('Max. 20 poll options allowed.')
                .catch(err => console.log(err));
        }

        //creates the poll message
        let i = 0;
        const pollMessage = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

        //poll message format and content
        const embed = {
            color: 'RANDOM',
            title: pollTitle,
            description: pollMessage,
            timestamp: new Date()
        }

        //array with the reactions emojis
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
        try {
            const msg = message.channel.send({ embed: embed })
                .then(function (message) {
                    for (let j = 0; j < i + 1; j++) {
                        message.react(reactions[j])
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }
}