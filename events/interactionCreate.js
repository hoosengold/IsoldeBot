const events = require('../commands/quiz/events/event'),
    { Interaction } = require('discord.js'),
    setup = require('../commands/initial/setup'),
    { Util } = require('../typescript/dist/typescript/src/Util')

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     *
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId.includes('Setup')) {
                handleSetupButtons(interaction)
            } else {
                events.execute(interaction)
            }
        } else if (interaction.isSelectMenu()) {
            handleSetupSelectMenu(interaction)
        } else {
            console.log(`No button/command detected in interaction event, exiting event...`)
            return
        }
    },
}

/**
 *
 * @param {Interaction} interaction
 */
async function handleSetupButtons(interaction) {
    const util = new Util(interaction.member.id, interaction.guildId, interaction.client)
    if (!util.isOwner()) {
        return interaction.reply({
            content: `Only the owner can change the settings!`,
            ephemeral: true,
        })
    }

    const customId = interaction.component.customId
    if (customId.includes('ready')) {
        setup.ready(interaction)
    } else if (customId.includes('yes')) {
        setup.yes(interaction)
    } else if (customId.includes('no')) {
        setup.no(interaction)
    } else if (customId.includes('help')) {
        setup.help(interaction)
    }
}

/**
 *
 * @param {Interaction} interaction
 */
async function handleSetupSelectMenu(interaction) {
    const util = new Util(interaction.member.id, interaction.guildId, interaction.client)
    if (!util.isOwner()) {
        return interaction.reply({
            content: `Only the owner can change the settings!`,
            ephemeral: true,
        })
    }
    setup.prefix(interaction)
}
