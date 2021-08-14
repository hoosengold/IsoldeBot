module.exports = {
	name: 'help',
	description: 'Returns an embed message with all commands, a short description, aliases, permissions and syntax.',
	aliases: ['helpmenu', 'menu'],
	cooldown: 5,
	permissions: 'everyone',
	syntax: '*help',
	args: false,
	execute(message) {
		const Discord = require('discord.js')
		const fs = require('fs')
		const profilePic = new Discord.MessageAttachment('./images/git_profile-pic.png')

		let helpEmbed = new Discord.MessageEmbed()
			.setAuthor('hoosengold', 'attachment://git_profile-pic.png', 'https://github.com/hoosengold/IsoldeBot')
			.setColor('RANDOM')
			.setTitle('Help Menu')
			.setDescription('A comprehensive list with all commands and how to use them.')
			.setTimestamp(new Date())
			.setFooter(`Note: undefined = no aliases \n Last updated: ` + fs.statSync('commands/help/help.js').mtime.toUTCString())

		const commandFolders = fs.readdirSync('commands')

		for (const folder of commandFolders) {
			const commandFiles = fs.readdirSync(`commands/${folder}`).filter((file) => file.endsWith('.js')) //filter the command files
			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`)
				helpEmbed.addField(
					`\`\*${command.name}\``,
					`\*${command.description}\* \n __Aliases:__ ${command.aliases} \n __Permissions:__ **${command.permissions}** \n __Syntax:__ \`${command.syntax}\` \n\n \u200b`
				)
			}
		}

		message.channel.send({ embeds: [helpEmbed], files: [profilePic] })
		//delete the call message
		message.delete().catch((err) => console.error(err))
	},
}
