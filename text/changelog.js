const Discord = require("discord.js"),
    changelogMessage = require("../bot.js");
//const image = new Discord.MessageAttachment('./images/');

function updates(message) {
    const embed = {
        title: 'The Friend Updates',
        color: '#D4AB29',
        description: '\u200b',
        //thumbnail: 'attachment://',
        fields: [
            {
                name: '**1.** *Everything is prettier now!* :purple_heart: ',
                value: 'All messages are embeded now and all of them have different colors.'
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: "**2.** *Bugs are no more!* :space_invader:",
                value: "Various bug fixes including the infamous \"NOT NOW BOT\" bug (thanks Ultra :grin:)! "
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
                value: 'If you encountered a bug or have an idea how to improve The Friend, just @hoosengold \(or open an [issue](https://github.com/hoosengold/ai_furnee-discord-bot/issues) on GitHub\) and tell him how terrible The Friend is coded. :purple_heart:'
            },
        ],
        footer: {
            text: 'Last Update:???????',
        },
        timestamp: new Date(),
    }


    /*message.channel.send(`The Friend Updates:
    -------------------------------------
    
    **1.** You found a new song and want to share it for others to enjoy as well? Or maybe you want something new and fresh in your YouTube playlist? **The Friend** got your back! 
    Use the *new* command \`*addMusic\` to suggest songs for other Stream Fams to enjoy! All you have to do is paste the YouTube link. It can't get any easier! :purple_heart:
    If you want to see what others are suggesting, just type \`*getMusic\` and enjoy a Brave New World!
    If you are experiencing problems, type \`*help\` in chat.
    
    **2.** The Friend. Such a wonderful name. :smile: But where it's coming from? Why \"The Friend\" and not \"The Best Discord Bot In Existence\"? Well, maybe there is a super secret command to reveal the story behind The Friend. :exploding_head:
    Or maybe all of this is just a clever ruse. :smiling_imp:
    
    You have an idea how to improve The Friend? Or maybe you encountered a bug? Feel free to @hoosengold and tell him how terrible The Friend is coded. :purple_heart:`
    );*/

    message.channel.send({ embed: embed })
}
module.exports = updates;