module.exports = {
	name: 'updates',
	description: 'Returns an embed message with the most recent changes to the bot.',
	aliases: ['changes', 'changelog', 'update'],
	cooldown: 5,
	permissions: 'everyone',
	syntax: '*updates',
	args: false,
	execute(message) {
		const Discord = require('discord.js')
		const fs = require('fs')

		//const image = new Discord.MessageAttachment('./images/');

		const embed = {
			title: 'The Friend Updates',
			color: 'RANDOM',
			description: '\u200b',
			//thumbnail: 'attachment://',
			fields: [
				{
					name: '**1.** The Friend is now up to date with the latest release of Discord.js - V13!',
					value:
						'There are a lot of new cool things! You can check the release of notes of Discord.js [here](https://discordjs.guide/whats-new.html)! :grin:',
				},
				{
					name: '\u200b',
					value: '\u200b',
				},
				{
					name: '**2.** Quizzes are here! :question: ',
					value: `The Friend now supports quizzes! Check out \`*help\` for more info about the commands! :grin:`,
				},
				{
					name: '\u200b',
					value: '\u200b',
				},
				{
					name: '**3.** Removed all music related commands.',
					value: `The Friend does not support the \`*addMusic\` and \`*getMusic\` commands anymore. Instead you can use the neat \*Rythm\* bot! :grin:`,
				},
				{
					name: '\u200b',
					value: '\u200b',
				},
				{
					name: '**4.** *Various performance and stability fixes.*',
					value:
						"This is just the *boring* part of the changelog where I say that the bot is **2000%** faster and that **ALL** bug are __fixed__. Yeah... Um, it's totally true. :clown:",
				},
				{
					name: '\u200b',
					value: '\u200b',
				},
				{
					name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
					value:
						'If you encountered a bug or have an idea how to improve The Friend, just @hoosengold (or open an [issue](https://github.com/hoosengold/IsoldeBot/issues) on Github) and tell him how terrible The Friend is coded. :purple_heart:',
				},
			],
			footer: {
				text: `Last updated: ` + fs.statSync('commands/help/help.js').mtime.toUTCString(),
			},
			timestamp: new Date(),
		}
		message.channel.send({ embeds: [embed] })
		//delete the call message
		message.delete().catch((err) => console.error(err))
	},
}
