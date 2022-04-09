const { Message, MessageEmbed, MessageAttachment } = require('discord.js'),
    path = require('path'),
    { Util } = require(path.join(__dirname, '../../typescript/dist/typescript/src/Util')),
    fs = require('fs')

module.exports = {
    name: 'permissions', //name of the command
    description: 'Comprehensive list for all permissions, that IsoldeBot needs in order to function correctly', //short description of the command
    aliases: ['perms'], //aliases for the command
    cooldown: 2, //cooldown for the command in seconds, the default cooldown is 5 seconds
    permissions: 'everyone', //permissions needed to use the command
    syntax: 'permissions', //syntax of the command
    args: false, //does the command have arguments, type false if it doesn't and remove args in execute
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     */
    execute(message, args, utilObject) {
        //put your code here, you can list dependencies here or before module.exports
        const profilePic = new MessageAttachment('./images/git_profile-pic.png')
        let embedMessage = new MessageEmbed()
            .setAuthor({ name: 'hoosengold', iconURL: 'attachment://git_profile-pic.png', url: 'https://github.com/hoosengold/IsoldeBot' })
            .setColor('AQUA')
            .setTitle('Why does IsoldeBot need so many permissions?')
            .setTimestamp(new Date())
            .setFooter({ text: 'Last updated: ' + fs.statSync(__filename).mtime.toUTCString() })
            .addFields(
                {
                    name: 'Send messages',
                    value: 'Needed to send message in different channel; IsoldeBot is basically useless without this permission',
                    inline: true,
                },
                {
                    name: 'Threads',
                    value: "Needed in order to be useful in threads, if there is a need to add such functionality; that way it won't be necessary to reinvite IsoldeBot in the future",
                    inline: true,
                },
                {
                    name: 'Manage message',
                    value: 'Needed for deleting message (moderation + clearing up chat from command calls)',
                    inline: true,
                },
                {
                    name: 'Embed links',
                    value: 'Needed to send links',
                    inline: true,
                },
                {
                    name: 'Attach files',
                    value: 'Needed for displaying a picture in embed messages (exactly like in this one)',
                    inline: true,
                },
                {
                    name: 'Read message history',
                    value: 'Needed in order to see old messages; it will be used in future (auto)moderation commands',
                    inline: true,
                },
                {
                    name: 'Mention everyone',
                    value: 'Needed for the countdown command; subject to change',
                    inline: true,
                },
                {
                    name: 'Use external emojis/stickers',
                    value: 'Needed in order to send external emojis and stickers',
                    inline: true,
                },
                {
                    name: 'Add reactions',
                    value: 'Needed for the `poll` command',
                    inline: true,
                },
                {
                    name: 'Use slash commands',
                    value: 'Future-proofing',
                    inline: true,
                },
                {
                    name: 'Manage roles',
                    value: 'It will be needed for a future feature - custom guild roles',
                    inline: true,
                },
                {
                    name: 'Manage channels',
                    value: "Needed in order to create channels ('setup' and 'isoldebot')",
                    inline: true,
                },
                {
                    name: 'Kick/ban members',
                    value: 'Needed for (auto)moderation; future-proofing',
                    inline: true,
                },
                {
                    name: 'Change/manage nicknames',
                    value: 'Needed for (auto)moderation; future-proofing',
                    inline: true,
                },
                {
                    name: 'Manage webhooks',
                    value: 'Can be used for sending messages; future-proofing',
                    inline: true,
                },
                {
                    name: 'Read messages / view channels',
                    value: 'Needed in order to "see" the messages of other members and also to "see" other channels in the guild',
                    inline: true,
                },
                {
                    name: 'Manage events',
                    value: 'This is a new feature in discord; events will be implemented soon in IsoldeBot as well',
                    inline: true,
                }
            )

        message.channel.send({
            embeds: [embedMessage],
            files: [profilePic],
        })
        message.delete()
    },
}
