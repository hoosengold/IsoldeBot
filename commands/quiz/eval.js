const evalMapResults = new Map()

module.exports = {
	name: 'evalquiz', //name of the command
	description:
		'Returns an embed message with the count of correct answers of every participant in the quizzes and notes down the member with the most correct answers.', //short description of the command
	aliases: ['quizeval', 'evaluatequiz', 'quizevaluate'], //aliases for the command
	cooldown: 10, //cooldown for the command in seconds, the default cooldown is 5 seconds
	permissions: 'moderators',
	syntax: '*evalquiz',
	args: true, //does the command have arguments, type false if it doesn't and remove args in execute
	execute(message, args) {
		//check the answer for every user and compare them to the answers, every user can call the function for themself
		//if admin calls  -> return only the count of correct answers, sort them, the most correct answers on top
		const Discord = require('discord.js'),
			db = require('../../utils/database/database'),
			crypto = require('crypto'),
			index = require('../../index')
		require('dotenv').config()
		;(async () => {
			try {
				//TODO send a message that it may take some time to process the command and that for now only admins can use it
				if (index.isAdmin(message.member.id)) {
					if (args.length === 0) {
						//if args[] is empty, fetch all users
						let listOfUsers = index.fetchMembers()
						const evalMap = new Map()

						for (let i = 0; i < listOfUsers.length; i++) {
							var userIDmention = listOfUsers[i]

							const secret = process.env.secret
							const hasher = crypto.createHmac('sha256', secret)
							var hashedID = hasher.update(userIDmention).digest('hex')

							await db
								.getClient()
								.then(async (client) => {
									await client
										.query({
											text: 'select * from quiz_users where user_id=$1',
											values: [hashedID],
											rowMode: 'array',
										})
										.then(async (result) => {
											if (result.rows.length == 0) {
												evalMap.set(userIDmention, null)
											} else {
												evalMap.set(userIDmention, result.rows[0])
											}
											//query the answers, save them in array and compare the values with the array
										})
										.catch(console.error())

									//release the client
									client.release()
									console.log(`Client released successfully.`)
								})
								.catch(console.error())
						}

						if (evalMap.size == 0) {
							console.log('Map is empty')
						} else {
							console.log(`Map size: ${evalMap.size}`)
						}

						await db
							.query({
								text: 'select answers from public.quiz',
								rowMode: 'array',
							})
							.then(async (result) => {
								for (const key of evalMap.keys()) {
									//every key in the map
									var value = evalMap.get(key)
									if (value != null) {
										let valuesArray = new Array()
										valuesArray = value
										valuesArray.toString()
										var correctAnswersCounter = 0
										for (let i = 1; i < result.rows.length; i++) {
											//every element in the result array
											let str = result.rows[i].toString()
											if (valuesArray.includes(str)) {
												correctAnswersCounter++
											}
											evalMapResults.set(key, correctAnswersCounter)
										}
									}
								}
							})
							.catch(console.error())

						const embed = new Discord.MessageEmbed()
							.setColor('RANDOM')
							.setTitle('Quiz results! :partying_face:')
							.setDescription(
								'A list with all users who participated in the quiz. Keep in mind that a participant is someone who answered to **at least 1** question. :purple_heart:'
							)

						//add field for every participant
						for (const entries of evalMapResults) {
							const member = index.member(entries[0])
							embed.addField(member.user.username, `Correct answers: ${entries[1]}`)
						}

						var lastEntryId
						var lastEntryCount
						let mostCorrectAnswers = []

						//FIXME optimize for loop
						//find the participant(s) with the most correct answers
						for (const entries of evalMapResults) {
							var currentEntryId = entries[0]
							var currentEntryCount = entries[1]
							if (mostCorrectAnswers.length == 0) {
								const member = index.member(entries[0])
								mostCorrectAnswers.push(member.user.username, currentEntryCount)
							} else if (currentEntryCount > lastEntryCount) {
								const member = index.member(currentEntryId)
								mostCorrectAnswers = []
								mostCorrectAnswers.push(member.user.username, currentEntryCount)
							} else if ((currentEntryCount = lastEntryCount)) {
								const member = index.member(currentEntryId)
								mostCorrectAnswers.push(member.user.username)
							}

							lastEntryId = currentEntryId
							lastEntryCount = currentEntryCount
						}

						var correctCount
						var correctUsers = ''
						for (let i = 0; i < mostCorrectAnswers.length; i++) {
							if (i == 1) {
								correctCount = mostCorrectAnswers[i]
							} else if (i == mostCorrectAnswers.length - 1 && correctUsers.includes(',')) {
								correctUsers = correctUsers + ' and ' + mostCorrectAnswers[i]
							} else {
								if (correctUsers == '') {
									correctUsers = mostCorrectAnswers[i]
								} else {
									correctUsers = correctUsers + ' , ' + mostCorrectAnswers[i]
								}
							}
						}

						embed.addField(`Most correct answers: \*${correctCount}\* by \__${correctUsers}\__`, `Congrats! :purple_heart:`)

						message.channel.send({ embeds: [embed] })
						message.delete().catch(console.error())

						listOfUsers = []
						evalMap.clear()
						evalMapResults.clear()
					} else {
						//TODO if user is tagged, fetch only their result
						return
					}
				} else {
					//TODO fetch results only for the user
					return
				}
			} finally {
				console.log(`Evaluation successfully executed.`)
			}
		})().catch((err) => {
			console.log(err.stack)
		})
	},
}
