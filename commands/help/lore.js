module.exports = {
    name: 'lore',
    description: 'Returns an embed message with the story behind the name of the bot in the guild, for which the bot was made.',
    aliases: ['story', 'friend', 'thefriend', 'origin', 'originstory', 'trivia'],
    cooldown: 5,
    permissions: 'everyone in AI Stream Fam',
    syntax: 'lore',
    args: false,
    execute(message, args, utilObject) {
        require('dotenv').config()

        const guild = utilObject.getGuild()
        if (guild.id != process.env.aiStreamFam) {
            setTimeout(() => {
                message.delete().catch(console.error())
            }, 1000)
            return message
                .reply({
                    content: `You can't use this command in this server. :purple_heart:`,
                    allowedMentions: { repliedUser: true },
                })
                .catch(console.error())
        }
        const embed = {
            title: '** `Super Secret` ** *(not really)*',
            description:
                "*Old man's voice:* \n" +
                'It was the Summer of 1996. The birds were singing their beautiful songs' +
                ' while the sun was burning through my skin. While I was sitting on the porch, something in the distance' +
                ' caught my eye. It was him. It was The Friend. He was up on the hill, looking (almost) as majestic as Wet Uncle from Hades.' +
                ' His long blonde hair fluttered in the wind. No shirt could contain his 12 pack.' +
                ' And then... Then he just dissapeared in the sun rays... \n\n' +
                "Fast forward to 2021. Ai_Furnee (btw it's www.twitch.tv/ai_furnee and while you are there, hit the subscribe button, " +
                "smash that like button and don't forget to comment what your favorite part of the video is. :rolling_eyes:) Anyway, Ai was streaming " +
                "some Muse Dash for the first time. For those who don't know, Muse Dash is a rhythm game with really memorable " +
                'characters and gorgeous jiggle physics. Ah, yeah, the music is also fine. :smirk: ' +
                'Anyway, the stream was going great. Ai was zooming through the levels like there is no tommorow. ' +
                'Then I felt it. I felt his presence. It was The Friend, lurking in the shadows, observing, guarding us. ' +
                'Everyone felt it - even Ai did. All proofs are long lost, but she got goosebumps almost as if ' +
                'a greater force was in there. A friendly force. ' +
                'It may not seem like it, but it turns out he was always there, especially when Ai leaves the stream running ' +
                'while idling on the main menu of Muse Dash. Legend has it... \n\n *starts whispering* \n\n Legend ' +
                'has it that he is always there when Muse Dash is being played to guard the viewers from evil forces. ' +
                'He never appears in chat, never responds, never stops lurking. \n\n' +
                "*The Friend's legacy shall never die!* \n\n" +
                '**Long live The Friend!**',
            color: 'RANDOM',
            timestamp: new Date(),
        }

        message.channel.send({ embeds: [embed] })
        //delete the call message
        message.delete().catch((err) => console.error(err))
    },
}
