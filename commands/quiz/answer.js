module.exports = {
	name: 'answer', //name of the command
	description: 'Takes an answer for one of the quiz questions.', //short description of the command
	aliases: ['quizanswer', 'answerquiz'], //aliases for the command
	cooldown: 1, //cooldown for the command in seconds, the default cooldown is 5 seconds
	permissions: 'moderators',
	syntax: '*answer <number_of_question> <letter_of_correct_answer>',
	args: true, //does the command have arguments, type false if it doesn't and remove args in execute
	execute(message, args) {
		//take answer and question number in args and insert the answer into quiz column answer for the specific question
		const Discord = require('discord.js')
		const db = require('../../utils/database/database')
		require('dotenv').config()
		const index = require('../../index')

		if (!index.isAdmin(message.member.id)) {
			console.log(`Permission to use a command denied`)
			setTimeout(() => {
				message.delete()
			}, 1000)
			return message
				.reply({
					content: `You don't have permissions to use this command!`,
					allowedMentions: { repliedUser: true },
				})
				.catch(console.error())
		}

		;(async () => {
			try {
				if (args.length > 2) {
					setTimeout(() => {
						message.delete()
					}, 1000)
					return message
						.reply({
							content: 'Incorect syntax. Please use "*answer <number_of_question> <correct_answer>" \n Example: *answer 1 a',
							allowedMentions: { repliedUser: true },
						})
						.catch(console.error())
				}

				let question = args[0]
				let answer = args[1]
				let answerID = ''

				switch (answer.toString()) {
					case 'A':
					case 'a':
						answerID = 'option1question' + question
						break
					case 'B':
					case 'b':
						answerID = 'option2question' + question
						break
					case 'C':
					case 'c':
						answerID = 'option3question' + question
						break
					case 'D':
					case 'd':
						answerID = 'option4question' + question
						break
					case 'E':
					case 'e':
						answerID = 'option5question' + question
						break
				}

				await db.query('update public.quiz set answers=$1 where counter=$2', [answerID, question])
				await message
					.reply({
						content: `Answer ${answer} to question ${question} added successfully.`,
						allowedMentions: { repliedUser: true },
					})
					.catch(console.error())
			} finally {
				console.log('Answer successfuly executed.')
			}
		})().catch((err) => {
			console.log(err.stack)
		})
	},
}
