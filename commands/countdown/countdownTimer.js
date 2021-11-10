module.exports = {
	name: 'countdown',
	description: 'Creates a countdown for a specific amount of hours.',
	aliases: ['timer', 'countdowntimer', 'timercountdown'],
	cooldown: 5,
	permissions: 'moderators',
	syntax: '*countdown <hours> <message>',
	args: true,
	execute(message, args) {
		//TODO add minutes
		const Discord = require('discord.js')
		const index = require('../../index')

		//check for mods
		if (!index.isAdmin(message.author.id)) {
			setTimeout(() => {
				message.delete().catch(console.error())
			}, 1500)
			return message
				.reply({
					content: `You don't have the right permsissions to use the \`countdown\` command.`,
					allowedMentions: { repliedUser: true },
				})
				.catch(console.error())
		}

		//check for args
		if (args[0] == null) {
			setTimeout(() => {
				message.delete().catch(console.error())
			}, 1500)
			return message
				.reply({
					content: `Please specify the duration of the countdown. Type \`*help\` if you want to see more details about he command. \n Your message was: __${message}__`,
					allowedMentions: { repliedUser: true },
				})
				.catch((err) => console.log(err))
		}

		//Parse the amount of hours into variable
		const hoursLeft = parseInt(args[0])

		//check is hoursLeft is a number
		if (isNaN(hoursLeft)) {
			setTimeout(() => {
				message.delete().catch(console.error())
			}, 1500)
			return message
				.reply({
					content: `Please use numbers in order to specify the duration of the countdown. Type \`*help\` if you want to see more details about he command. \n Your message was: __${message}__`,
					allowedMentions: { repliedUser: true },
				})
				.catch((err) => console.log(err))
		}

		//TODO limit the countdown command
		/**
		if (hoursLeft > 24) {
			setTimeout(() => {
				message.delete().catch(console.error())
			}, 1500)
			return message
				.reply({
					content: `The maximum duration of a countdown cannot exceed 24 hours because of limitations in the hosting platform. Sorry for the inconvenience!`,
				})
				.catch(console.error())
		}*/

		//Get the date when the countdown should end
		var countdownDate = new Date()
		countdownDate.setUTCHours(countdownDate.getUTCHours() + hoursLeft)

		//Message when the countdown ends
		if (hoursLeft == 1) {
			message
				.reply({
					content: 'The Countdown will end after **' + hoursLeft + ' hour** on *' + countdownDate + '*',
					allowedMentions: { repliedUser: true },
				})
				.catch(console.error())
			console.log('Countdown date messaged.')
		} else {
			message
				.reply({
					content: 'The Countdown will end after **' + hoursLeft + ' hours** on *' + countdownDate + '*',
					allowedMentions: { repliedUser: true },
				})
				.catch(console.error())
			console.log('Countdown date messaged.')
		}

		var msg = ''

		for (let i = 1; i < args.length; i++) {
			if (msg == '') {
				msg = args[i] + ' '
			} else {
				msg = msg + args[i] + ' '
			}
		}

		var messageCountHour = 0
		var messageCountMinute = 0

		// Update the count down every 1 second
		var x = setInterval(() => {
			// Get today's date and time
			var now = new Date()

			// Find the distance between now and the count down date
			var distance = countdownDate - now

			//Calculate remaining hours and minutes
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

			//Message everyone at the last 1 hour/30 minutes
			if (hours == 1 && minutes == 0 && messageCountHour == 0) {
				message.channel.send('Only **1 hour** left!')
				messageCountHour++
				console.log('Message sent: 1 hour left.')
			} else if (minutes == 30 && hours == 0 && messageCountMinute == 0) {
				message.channel.send('Only **30 minutes** left!')
				messageCountMinute++
				console.log('Message sent: 30 minutes left.')
			}

			// If the countdown is finished, send message
			if (distance <= 0) {
				clearInterval(x)
				if (msg == '') {
					message.channel.send(`@everyone Time's up!`)
				} else {
					message.channel.send(`@everyone ${msg}`)
				}
				console.log('Message sent: time expired.')
			}
		}, 1000)
	},
}
