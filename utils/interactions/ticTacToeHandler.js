const index = require('../../index'),
    { MessageActionRow, Interaction } = require('discord.js')

module.exports = {
    /**
     *
     * @param {Interaction} interaction
     */
    async handleTtcButtons(interaction) {
        const player1 = interaction.message.content.split(' ')[3].split('@')[1].split('>')[0]
        const player2 = interaction.message.content.split(' ')[11].split('!')[1].split('>')[0]
        const interactionAuthorId = interaction.member.id

        if (interactionAuthorId != player1 && interactionAuthorId != player2) {
            return await interaction.reply({
                content: "This is not your game and you can't participate in it.",
                ephemeral: true,
            })
        }

        const player = index.ticTacToeUsers.get(interactionAuthorId)

        if (player.hasPlayed) {
            return await interaction.reply({
                content: "It's not your turn yet.",
                ephemeral: true,
            })
        }

        if (interactionAuthorId == player1) {
            interaction.component.setLabel('X').setStyle('PRIMARY').setDisabled(true)
            index.ticTacToeUsers.set(player1, { hasPlayed: true })
            index.ticTacToeUsers.set(player2, { hasPlayed: false })
        } else {
            interaction.component.setLabel('O').setStyle('DANGER').setDisabled(true)
            index.ticTacToeUsers.set(player1, { hasPlayed: false })
            index.ticTacToeUsers.set(player2, { hasPlayed: true })
        }

        let counterBtns = 0
        let currentBoard = []

        for (let i = 0; i < interaction.message.components.length; i++) {
            const element = interaction.message.components[i]
            for (let j = 0; j < element.components.length; j++) {
                const btn = element.components[j]
                if (btn.disabled) {
                    counterBtns++
                }
                currentBoard.push(btn.label)
            }
        }

        console.log('currentBoard: ' + currentBoard)

        const winner = evalBoard(interaction, currentBoard)

        if (!winner && counterBtns == 9) {
            disableButtons(interaction)
            await updateInteraction(interaction, "**It's a tie! But you can always have a rematch!**")
            index.ticTacToeUsers.delete(player1)
            index.ticTacToeUsers.delete(player2)
        } else if (winner) {
            disableButtons(interaction)
            await updateInteraction(interaction, '**And we have a winner! Congratulations!**')
            index.ticTacToeUsers.delete(player1)
            index.ticTacToeUsers.delete(player2)
        } else {
            await updateInteraction(interaction, interaction.message.content)
        }
    },
}
/**
 *
 * Called after every move in ttc
 *
 * @param {string[]} currentBoard
 * @param {Interaction} interaction
 */
function evalBoard(interaction, currentBoard) {
    let winner = false

    if (currentBoard[0] === currentBoard[1] && currentBoard[1] === currentBoard[2] && currentBoard[0] !== ' ') {
        interaction.message.components[0].components[0].setStyle('SUCCESS')
        interaction.message.components[0].components[1].setStyle('SUCCESS')
        interaction.message.components[0].components[2].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[3] === currentBoard[4] && currentBoard[4] === currentBoard[5] && currentBoard[3] !== ' ') {
        interaction.message.components[1].components[0].setStyle('SUCCESS')
        interaction.message.components[1].components[1].setStyle('SUCCESS')
        interaction.message.components[1].components[2].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[6] === currentBoard[7] && currentBoard[7] === currentBoard[8] && currentBoard[6] !== ' ') {
        interaction.message.components[2].components[0].setStyle('SUCCESS')
        interaction.message.components[2].components[1].setStyle('SUCCESS')
        interaction.message.components[2].components[2].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[0] === currentBoard[3] && currentBoard[3] === currentBoard[6] && currentBoard[0] !== ' ') {
        interaction.message.components[0].components[0].setStyle('SUCCESS')
        interaction.message.components[1].components[0].setStyle('SUCCESS')
        interaction.message.components[2].components[0].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[1] === currentBoard[4] && currentBoard[4] === currentBoard[7] && currentBoard[1] !== ' ') {
        interaction.message.components[0].components[1].setStyle('SUCCESS')
        interaction.message.components[1].components[1].setStyle('SUCCESS')
        interaction.message.components[2].components[1].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[2] === currentBoard[5] && currentBoard[5] === currentBoard[8] && currentBoard[2] !== ' ') {
        interaction.message.components[0].components[2].setStyle('SUCCESS')
        interaction.message.components[1].components[2].setStyle('SUCCESS')
        interaction.message.components[2].components[2].setStyle('SUCCESS')
        winner = true
    } else if (currentBoard[0] === currentBoard[4] && currentBoard[4] === currentBoard[8] && currentBoard[0] !== ' ') {
        interaction.message.components[0].components[0].setStyle('SUCCESS')
        interaction.message.components[1].components[1].setStyle('SUCCESS')
        interaction.message.components[2].components[2].setStyle('SUCCESS')
    } else if (currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6] && currentBoard[2] !== ' ') {
        interaction.message.components[0].components[2].setStyle('SUCCESS')
        interaction.message.components[1].components[1].setStyle('SUCCESS')
        interaction.message.components[2].components[0].setStyle('SUCCESS')
        winner = true
    }
    return winner
}

/**
 *
 * @param {Interaction} interaction
 * @param {string} text
 */
async function updateInteraction(interaction, text) {
    await interaction.update({
        content: text,
        components: [
            new MessageActionRow().addComponents([
                interaction.message.components[0].components[0],
                interaction.message.components[0].components[1],
                interaction.message.components[0].components[2],
            ]),
            new MessageActionRow().addComponents([
                interaction.message.components[1].components[0],
                interaction.message.components[1].components[1],
                interaction.message.components[1].components[2],
            ]),
            new MessageActionRow().addComponents([
                interaction.message.components[2].components[0],
                interaction.message.components[2].components[1],
                interaction.message.components[2].components[2],
            ]),
        ],
    })
}

/**
 *
 * @param {Interaction} interaction
 */
function disableButtons(interaction) {
    for (let i = 0; i < interaction.message.components.length; i++) {
        const element = interaction.message.components[i]
        for (let j = 0; j < element.components.length; j++) {
            element.components[j].setDisabled(true)
        }
    }
}
