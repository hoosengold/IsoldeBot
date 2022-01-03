const { Message } = require('discord.js'),
    db = require('../../utils/database/database'),
    { Util } = require('../../typescript/dist/typescript/src/Util')

module.exports = {
    name: 'clear',
    description: 'Delete the quiz entries from the table in the database.',
    aliases: ['clearquiz', 'quizclear', 'resetquiz', 'quizreset'],
    cooldown: 10,
    permissions: 'moderators',
    syntax: 'clear',
    args: false,
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     * @returns
     */
    execute(message, args, utilObject) {
        //check for mods
        if (!utilObject.isAdmin()) {
            setTimeout(() => {
                message.delete().catch(console.error())
            }, 1500)
            return message
                .reply({
                    content: `You don't have the right permsissions to use the \`quiz\` command.`,
                    allowedMentions: { repliedUser: true },
                })
                .catch(console.error())
        }

        ;(async () => {
            try {
                let text = `select counter from guild_${utilObject.getGuildId()}.quiz`
                db.query(text)
                    .then((result) => {
                        for (let i = 0; i < result.rowCount; i++) {
                            if (i != 0) {
                                text = `delete from guild_${utilObject.getGuildId()}.quiz where counter='${i}'`
                                db.query(text)
                            }
                        }
                    })
                    .catch(console.error())
            } finally {
                setTimeout(() => {
                    message.delete().catch(console.error())
                }, 1000)
                message.reply({ content: 'All questions successfully deleted.', allowedMentions: { repliedUser: true } }).catch(console.error())
            }
        })().catch((err) => console.log(err))
    },
}
