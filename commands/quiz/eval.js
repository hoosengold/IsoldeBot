const { Message, MessageEmbed } = require('discord.js'),
    db = require('../../utils/database/database'),
    crypto = require('crypto'),
    { Util } = require('../../typescript/dist/typescript/src/Util')

const evalMapResults = new Map()

module.exports = {
    name: 'evalquiz', //name of the command
    description:
        'Returns an embed message with the count of correct answers of every participant in the quizzes and notes down the member with the most correct answers.' +
        "If it's called by a moderator without arguments, it fetches the results of all participants. If it's called by a moderator with a tagged user," +
        'it fetches only the results of the tagged user. If called by a non-moderator, it fetches only the results of the author of the command, no matter what arguments are passed.', //short description of the command
    aliases: ['quizeval', 'evaluatequiz', 'quizevaluate'], //aliases for the command
    cooldown: 10, //cooldown for the command in seconds, the default cooldown is 5 seconds
    permissions: 'moderators',
    syntax: '*evalquiz',
    args: true, //does the command have arguments, type false if it doesn't and remove args in execute

    /**
     *
     * @param {Message} message
     * @param {[]} args
     * @param {Util} utilObject
     */
    execute(message, args, utilObject) {
        //check the answer for every user and compare them to the answers, every user can call the function for themself
        //if admin calls  -> return only the count of correct answers, sort them, the most correct answers on top
        require('dotenv').config()
        ;(async () => {
            try {
                message.channel.send(
                    'This could take a couple of seconds. If something goes wrong, an error message will be send. Thank you for the patience! :purple_heart:'
                )
                if (utilObject.isAdmin()) {
                    if (args.length === 0) {
                        //if args[] is empty, fetch all users
                        let listOfUsers = utilObject.fetchMembers()
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
                            return message.channel.send('No results found.')
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

                        const embed1 = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('Quiz results! :partying_face:')
                            .setDescription(
                                'A list with all users who participated in the quiz. Keep in mind that a participant is someone who answered to **at least 1** question. :purple_heart:'
                            )
                        const embed2 = new MessageEmbed().setColor(embed1.color)

                        var embedCounter = 0

                        //FIXME max 25 fields per embed message
                        //add field for every participant
                        for (const entries of evalMapResults) {
                            const member = utilObject.getMemberById(entries[0])
                            if (embedCounter % 2 == 0) {
                                embed1.addField(member.user.username, `Correct answers: ${entries[1]}`)
                            } else {
                                embed2.addField(member.user.username, `Correct answers: ${entries[1]}`)
                            }
                        }

                        //find the participant(s) with the most correct answers, save the usernames in array
                        var maxElement = 0
                        let mostCorrectAnswers = []

                        for (const entries of evalMapResults) {
                            const currentEntryId = entries[0]
                            const currentEntryCount = entries[1]

                            if (currentEntryCount >= maxElement) {
                                if (currentEntryCount != maxElement) {
                                    mostCorrectAnswers = []
                                }
                                const member = utilObject.getMemberById(currentEntryId)
                                mostCorrectAnswers.push(member.user.username)
                                maxElement = currentEntryCount
                            }
                        }

                        const correctUsers = mostCorrectAnswers.toString()

                        //TODO if mostCorrectAnswers.length > 25
                        const embedMVP = new MessageEmbed()
                            .setColor(embed1.color)
                            .addField(`Most correct answers: \*${maxElement}\* by \__${correctUsers}\__`, `Congrats! :purple_heart:`)

                        message.channel.send({ embeds: [embed1, embed2, embedMVP] })
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
