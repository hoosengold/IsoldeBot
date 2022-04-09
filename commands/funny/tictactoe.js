const { Message } = require('discord.js'),
    path = require('path'),
    { Util } = require(path.join(__dirname, '../../typescript/dist/typescript/src/Util.js')),
    { TicTacToe } = require(path.join(__dirname, '../../typescript/dist/typescript/src/TicTacToe.js')),
    index = require('../../index.js')

module.exports = {
    name: 'tictactoe',
    description: 'Play a game of Tic Tac Toe with somebody else, just mention them in the command',
    aliases: ['tictac', 'ttc'],
    cooldown: 2,
    permissions: 'everyone',
    syntax: 'tictactoe',
    args: true,
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     */
    execute(message, args, utilObject) {
        if (args.length < 1) {
            return message.reply('You have to mention somebody in order to play a game of Tic Tac Toe!')
        }

        if (args.length > 1) {
            return message.reply('You can only mention 1 person!')
        }

        const tmpArgs = args[0].split('!')[1].split('>')[0]

        if (message.author.id == tmpArgs) {
            return message.channel.send("You can't play alone, mention somebody else!")
        }

        if (index.ticTacToeUsers.has(message.author.id) || index.ticTacToeUsers.has(tmpArgs)) {
            return message.channel.send({
                content: 'One of the players is already in another TicTacToe game. Try again after finishing the other game.',
            })
        }

        index.ticTacToeUsers.set(message.author.id, { hasPlayed: false, inGameWith: tmpArgs })
        index.ticTacToeUsers.set(tmpArgs, { hasPlayed: true, inGameWith: message.author.id })

        const board = new TicTacToe(message.author.id)
        message.channel.send({
            content: `The game between ${message.author} (Player 1 -> X / Blue) and ${args[0]} (Player 2 -> O / Red) begins!`,
            components: board.getBoard(),
        })
    },
}
