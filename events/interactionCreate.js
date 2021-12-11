const events = require('../commands/quiz/events/event')

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {
        if (interaction.isButton()) {
            events.execute(interaction)
        } else if (interaction.isCommand()) {
            return
        } else {
            console.log(`No button/command detected in interaction event, exiting event...`)
            return
        }
    },
}
