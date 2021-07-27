module.exports = {
    name: 'answer', //name of the command
    description: 'Insert the answers for the quiz', //short description of the command
    aliases: ['quizanswer', 'answerquiz'], //aliases for the command
    cooldown: 0, //cooldown for the command in seconds, the default cooldown is 5 seconds
    args: true, //does the command have arguments, type false if it doesn't and remove args in execute
    execute(message, args) {
        //take answer and question number in args and insert the answer into quiz column answer for the specific question
        const Discord = require('discord.js');
        const pool = require('../../connections/database');
        require('dotenv').config()
        const roles = require('../../index')

        if(!roles.isAdmin()){
            console.log(`Permission to use a command denied`)
            return message.reply(`You don't have permissions to use this command!`)
        }

        //throw an error if there are any idle clients
        pool.on('error', (err, client) => {
            console.error('Error on idle client', err)
            process.exit(-1)
        })

            ; (async () => {

                const client = await pool.connect()
                console.log("Connected successfully.")

                try {

                    if (args.length > 2) {
                        return message.reply('Incorect syntax. Please use "*answer <number_of_question> <correct_answer>" \n Example: *answer 1 a')
                    }

                    let question = args[0]
                    let answer = args[1]
                    let answerID = ''

                    switch (answer.toString()) {
                        case 'A':
                        case 'a':
                            answerID = 'option1'
                            break;
                        case 'B':
                        case 'b':
                            answerID = 'option2'
                            break;
                        case 'C':
                        case 'c':
                            answerID = 'option3'
                            break;
                        case 'D':
                        case 'd':
                            answerID = 'option4'
                            break;
                        case 'E':
                        case 'e':
                            answerID = 'option5'
                            break;
                    }

                    await client.query('update public.quiz set answers=$1 where counter=$2', [answerID, question])
                    await message.reply(`Answer ${answer} to question ${question} added successfully.`)

                } finally {
                    //release the client to the pool
                    await client.release()
                    console.log("Client released succesfully.")
                }
            })().catch(err => {
                console.log(err.stack);
            });
    }
}
