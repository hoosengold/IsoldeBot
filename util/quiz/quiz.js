module.exports = {
    name: 'quiz', //name of the command
    description: 'Initialize a quiz', //short description of the command
    //aliases: [], //aliases for the command
    cooldown: 5, //cooldown for the command in seconds, the default cooldown is 5 seconds
    args: true, //does the command have arguments, type false if it doesn't and remove args in execute
    execute(message, args) {
        const Discord = require('discord.js');
        const buttons = require('discord-buttons');
        const emojiArray = require('../poll/pollutil/emojiArray');
        const db = require('../../connections/database')

        const questionRegEx = new RegExp(/((\ )*[a-zA-Z]*(\ )*\d*(\ )*)*\?/gm),
            optionsRegEx = new RegExp(/(?:((?:(\ ))*[a-zA-Z]*(?:(\ ))*\d*(\ )*))*\!/i);

        ; (async () => {
            try {
                for (let index = 0; index < args.length; index++) {
                    console.log(`${args[index]}: ${optionsRegEx.test(args[index])}`)
                }

                //initialize array for the question and options
                let i = 0;
                let j = 0;
                let quizArray = [];

                //checks if the array element in args ends with ? or !;
                //if the element does not have?/!, add it to the current quizArray element
                //if it does have?/!, add it to the current quizArray element and call the j+1 element
                for (i; i < args.length; i++) {
                    if (questionRegEx.test(args[i])) {
                        if (quizArray[j] == undefined) {
                            quizArray[j] = args[i]
                        } else {
                            quizArray[j] = quizArray[j] + ' ' + args[i]
                        }
                        j++
                    } else if (optionsRegEx.test(args[i])) {
                        if (quizArray[j] == undefined) {
                            quizArray[j] = args[i]
                        } else {
                            quizArray[j] = quizArray[j] + ' ' + args[i]
                        }
                        j++
                    } else {
                        if (quizArray[j] == undefined) {
                            quizArray[j] = args[i]
                        } else {
                            quizArray[j] = quizArray[j] + ' ' + args[i]
                        }
                    }
                }
                console.log(`quizArray: ${quizArray}`)

                //checks if the command has title
                if (!questionRegEx.test(quizArray[0])) {
                    return await message.reply('No quiz title/question specified.')
                }

                //checks if the command has options and if they are more than 6
                if (!optionsRegEx.test(quizArray[1])) {
                    return await message.reply('No quiz options specified.')
                } else if (quizArray.length > 6) {
                    return await message.channel.send(`Max. 5 options!`)
                }

                //creates a string for the options
                let quizMessage = ''
                for (let k = 1; k < quizArray.length; k++) {
                    if (quizMessage === '') {
                        quizMessage = `${emojiArray()[k - 1]} ${quizArray[k]} \n\n `
                    } else {
                        quizMessage = `${quizMessage} ${emojiArray()[k - 1]} ${quizArray[k]} \n\n `
                    }
                }

                let quizOptions = ''
                for (let k = 1; k < quizArray.length; k++) {
                    if (quizOptions === '') {
                        quizOptions = `${quizArray[k]}  `
                    } else {
                        quizOptions = `${quizOptions} ${quizArray[k]}   `
                    }
                }

                let btnOptions = ['A', 'B', 'C', 'D', 'E']

                let row = []

                //get the row count
                var rs = await db.query("select * from quiz")
                var quizCounter = rs.rows.length;

                for (let m = 1; m < quizArray.length; m++) {
                    let btn = new buttons.MessageButton()
                        .setStyle('blurple')
                        .setID(`option${m}question${quizCounter}`)
                        .setLabel(`Option ${btnOptions[m - 1]}`)

                    row.push(btn)
                }

                //embed format and content
                const embed = {
                    color: 'RANDOM',
                    title: `Question ${quizCounter}: ${quizArray[0]}`,
                    description: `${quizMessage} \n\n`,
                }

                await db.query('insert into quiz(counter, question, options) values ($1, $2, $3)', [quizCounter, quizArray[0], quizOptions])
                await message.channel.send({ embed: embed, buttons: row })

            } finally {
                console.log("Quiz executed succesfully.")
            }
        })().catch(err => {
            console.log(err.stack);
        });

    }
}