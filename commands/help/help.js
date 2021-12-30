module.exports = {
    name: 'help',
    description: 'Returns an embed message with all commands, a short description, aliases, permissions and syntax.',
    aliases: ['helpmenu', 'menu'],
    cooldown: 5,
    permissions: 'everyone',
    syntax: '*help',
    args: false,
    execute(message, args, utilObject) {
        const Discord = require('discord.js')
        const fs = require('fs')
        const profilePic = new Discord.MessageAttachment('./images/git_profile-pic.png')

        let helpEmbed = new Discord.MessageEmbed()
            .setAuthor('hoosengold', 'attachment://git_profile-pic.png', 'https://github.com/hoosengold/IsoldeBot')
            .setColor('RANDOM')
            .setTitle('IsoldeBot Help Menu')
            .setDescription('A comprehensive list with all commands and how to use them.')

        let helpEmbed2 = new Discord.MessageEmbed()
            .setColor(helpEmbed.color)
            .setTimestamp(new Date())
            .setFooter(`Note: undefined = no aliases \n Last updated: ` + fs.statSync('commands/help/help.js').mtime.toUTCString())

        const commandFolders = fs.readdirSync('commands')

        let flag = true
        Boolean(flag)
        let j = 0

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`commands/${folder}`).filter((file) => file.endsWith('.js')) //filter the command files
            for (const file of commandFiles) {
                j++
                const command = require(`../../commands/${folder}/${file}`)
                if (!(j % 2 == 0)) {
                    helpEmbed.addField(
                        `\`\*${command.name}\``,
                        `\*${command.description}\* \n __Aliases:__ ${command.aliases} \n __Permissions:__ **${command.permissions}** \n __Syntax:__ \`${command.syntax}\` \n\n \u200b`
                    )
                } else {
                    helpEmbed2.addField(
                        `\`\*${command.name}\``,
                        `\*${command.description}\* \n __Aliases:__ ${command.aliases} \n __Permissions:__ **${command.permissions}** \n __Syntax:__ \`${command.syntax}\` \n\n \u200b`
                    )
                }
            }
        }

        helpEmbed2.addField(
            `For more information about the commands:`,
            `Please refer to [the official GitHub repository](https://github.com/hoosengold/IsoldeBot/tree/main#commands).`
        )

        message.channel.send({ embeds: [helpEmbed, helpEmbed2], files: [profilePic] })
        //delete the call message
        message.delete().catch((err) => console.error(err))
    },
}
