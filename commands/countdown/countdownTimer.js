const { Message } = require('discord.js'),
    { Util } = require('../../typescript/dist/typescript/src/Util')

module.exports = {
    name: 'countdown',
    description:
        'Creates a countdown for a specific amount of hours and/or minutes. Returns the countdown date for 4 different timezones (GMT, EST, CET, JST)',
    aliases: ['timer', 'countdowntimer', 'timercountdown'],
    cooldown: 5,
    permissions: 'moderators',
    syntax: 'countdown <hours> <minutes?> <message?>',
    args: true,
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     * @returns
     */
    execute(message, args, utilObject) {
        setTimeout(() => {
            message.delete().catch(console.error())
        }, 1500)
        //check for mods
        if (!utilObject.isAdmin()) {
            return message
                .reply({
                    content: `You don't have the right permsissions to use the \`countdown\` command.`,
                    allowedMentions: { repliedUser: true },
                })
                .catch(console.error())
        }

        //check for args
        if (args[0] == null || isNaN(args[0])) {
            return message
                .reply({
                    content: `Please specify the duration of the countdown. Type \`*help\` if you want to see more details about he command. \n Your message was: __${message}__`,
                    allowedMentions: { repliedUser: true },
                })
                .catch((err) => console.log(err))
        } else if (args[0] == 0 && (isNaN(args[1]) || args[1] == 0)) {
            return message
                .reply({
                    content: `You have to specify the amount of minutes if you want to use the command with minutes only, e.g. \`*countdown 0 35 Some message to display when the countdown is over\` \n Your message was: __${message}__`,
                    allowedMentions: { repliedUser: true },
                })
                .catch((err) => console.log(err))
        }

        //Parse the amount of hours/minutes into variable
        var minutes, hoursLeft
        if (!isNaN(args[1])) {
            minutes = parseInt(args[1])
            hoursLeft = parseInt(args[0]) + Math.floor(minutes / 60)
            minutes = minutes % 60
        } else {
            hoursLeft = parseInt(args[0])
            minutes = 0
        }

        if (minutes < 0 || hoursLeft < 0) {
            return message
                .reply({
                    content: `Please use only positive numbers. \n Your message was: __${message}__`,
                    allowedMentions: { repliedUser: true },
                })
                .catch((err) => console.log(err))
        } else if (hoursLeft > 24) {
            return message
                .reply({
                    content: `The maximum duration of a countdown cannot exceed 24 hours because of limitations in the hosting platform. Sorry for the inconvenience! \n Please set hours to **0** if you want to use the command with minutes only, e.g. \`*countdown 0 35 Some message to display when the countdown is over\` \n Your message was: __${message}__`,
                })
                .catch(console.error())
        }

        //FIXME incorrect jst day
        //Get the date when the countdown should end
        var countdownDate = new Date()
        countdownDate.setUTCHours(countdownDate.getUTCHours() + hoursLeft)
        countdownDate.setUTCMinutes(countdownDate.getUTCMinutes() + minutes)
        countdownDate.setUTCSeconds(0)
        var dateEST = new Date(countdownDate)
        var dateCET = new Date(countdownDate)
        var dateJST = new Date(countdownDate)

        let str = `\>\>\> ${countdownDate.toDateString()} __*${countdownDate.toLocaleTimeString('en-GB', { timeZone: 'GMT' })}*__ **GMT**
${dateEST.toDateString()} __*${dateEST.toLocaleTimeString('en-US', { timeZone: 'EST' })}*__ **EST**
${dateCET.toDateString()} __*${dateCET.toLocaleTimeString('de-DE', { timeZone: 'CET' })}*__ **CET**
${dateJST.toDateString()} __*${dateJST.toLocaleTimeString('ja-JP-u-ca-japanese', { timeZone: 'JST' })}*__ **JST**`

        //Message when the countdown ends
        if (hoursLeft == 0) {
            message.channel
                .send({
                    content: `The Countdown will end after **${minutes} minutes** on:\n${str}`,
                    allowedMentions: { repliedUser: true },
                })
                .catch(console.error())
            console.log('Countdown date messaged.')
        } else if (hoursLeft == 1) {
            if (minutes == 0) {
                message.channel
                    .send({
                        content: `The Countdown will end after **${hoursLeft} hour** on:\n${str}`,
                        allowedMentions: { repliedUser: true },
                    })
                    .catch(console.error())
                console.log('Countdown date messaged.')
            } else {
                message.channel
                    .send({
                        content: `The Countdown will end after **${hoursLeft} hour and ${minutes} minutes** on:\n${str}`,
                        allowedMentions: { repliedUser: true },
                    })
                    .catch(console.error())
                console.log('Countdown date messaged.')
            }
        } else {
            if (minutes == 0) {
                message.channel
                    .send({
                        content: `The Countdown will end after **${hoursLeft} hours** on:\n${str}`,
                        allowedMentions: { repliedUser: true },
                    })
                    .catch(console.error())
                console.log('Countdown date messaged.')
            } else {
                message.channel
                    .send({
                        content: `The Countdown will end after **${hoursLeft} hours and ${minutes} minutes** on:\n${str}`,
                        allowedMentions: { repliedUser: true },
                    })
                    .catch(console.error())
                console.log('Countdown date messaged.')
            }
        }

        var msg = ''

        for (let i = 1; i < args.length; i++) {
            if (!isNaN(args[i]) && i == 1) {
                continue
            }
            if (msg == '') {
                msg = args[i] + ' '
            } else {
                msg = msg + args[i] + ' '
            }
        }

        var messageCountHour = 0
        var messageCountMinute = 0

        // Update the countdown every 1 second
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
