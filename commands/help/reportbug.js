module.exports = {
	name: 'bug',
	description: 'Returns an embed message with information on how to report a bug or an issue in the bot.',
	aliases: ['bugreport', 'reportbug', 'reportabug', 'bugs', 'issue', 'openissue'],
	cooldown: 5,
	permissions: 'everyone',
	syntax: '*bug',
	args: false,
	execute(message) {
		const Discord = require('discord.js')

		const embed = {
			title: 'Report a bug',
			color: 'RANDOM',
			description:
				'If you encountered a bug or have an idea how to improve The Friend, just @hoosengold (or open an [issue](https://github.com/hoosengold/IsoldeBot/issues) on Github) and tell him how terrible The Friend is coded. :purple_heart:',
		}
		message.channel.send({ embeds: [embed] })
		//delete the call message
		message.delete().catch((err) => console.error(err))
	},
}
