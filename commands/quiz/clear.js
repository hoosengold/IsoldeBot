module.exports = {
	name: 'clear',
	description: 'Delete the quiz entries from the table in the database.',
	aliases: ['clearquiz', 'quizclear', 'resetquiz', 'quizreset'],
	cooldown: 10,
	permissions: 'moderators',
	syntax: '*clear',
	args: false,
	execute(message) {
		const Discord = require('discord.js'),
			db = require('../../utils/database/database'),
			index = require('../../index')

		//check for mods
		if (!index.isAdmin(message.author.id)) {
			setTimeout(() => {
				message.delete()
			}, 1500)
			return message.reply({
				content: `You don't have the right permsissions to use the \`quiz\` command.`,
				allowedMentions: { repliedUser: true },
			})
		}

		;(async () => {
			try {
				db.query({
					text: 'select counter from public.quiz',
				})
					.then((result) => {
						for (let i = 0; i < result.rowCount; i++) {
							if (i != 0) {
								db.query({ text: 'delete from public.quiz where counter=$1', values: [i] })
							}
						}
					})
					.catch(console.error())
			} finally {
				setTimeout(() => {
					message.delete()
				}, 1000)
				message.reply({ content: 'All questions successfully deleted.', allowedMentions: { repliedUser: true } })
			}
		})().catch((err) => console.log(err))
	},
}