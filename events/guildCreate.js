const { Guild, Permissions, GuildChannel } = require('discord.js'),
    db = require('../utils/database/database'),
    { Setup } = require('../typescript/dist/typescript/src/Setup')

module.exports = {
    name: 'guildCreate',
    once: false,
    /**
     *
     * @param {Guild} guild
     */
    execute(guild) {
        setTimeout(() => {
            init(guild)
        }, 10000)
    },
}

/**
 * Main function of the event
 * @param {Guild} guild
 */
async function init(guild) {
    guild.channels
        .create('setup', {
            reason: 'Setup IsoldeBot',
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                },
            ],
        })
        .then(async () => {
            const channel = guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'setup')
            channel.send(
                `New channel ("setup") created. Please continue the setup there. (If you do not see the channel or any buttons there after a 10 seconds, run \`*setup\` again.)`
            )
            await handle(channel, guild)
        })
}

/**
 *
 * @param {GuildChannel} channel
 * @param {Guild} guild
 */
async function handle(channel, guild) {
    channel.send(`The setup will begin shortly, let me fetch your current settings. This can take a couple of seconds...`)
    let existBool = new Boolean()
    await db.getClient().then(async (client) => {
        let text = `SELECT exists(select schema_name FROM information_schema.schemata WHERE schema_name = 'guild_${guild.id}');`
        await client
            .query({
                text: text,
            })
            .then((result) => {
                existBool = result.rows[0].exists.valueOf()
                client.release()
            })
            .then(async () => {
                const setup = new Setup()
                if (existBool) {
                    channel.send('The following settings were found:')
                    await db.getClient().then(async (client) => {
                        let text = `SELECT * from guild_${guild.id}.settings`
                        client
                            .query({
                                text: text,
                                rowMode: 'array',
                            })
                            .then((result) => {
                                channel.send(`Notification channel: **${result.rows[0][1]}**\nPrefix: **${result.rows[0][0]}**`)
                                channel.send({
                                    content: `You can change your prefix at any time. The guild members will be notified of the change in the IsoldeBot notification channel, if you choose to have one. (Only the prefix and the optional notification channel can be changed at the moment. Ideas are always welcome! Please refer to the official GitHub repo for more info!). Press "Confirm to display the buttons."`,
                                    components: [setup.getDefaultRow()],
                                })
                            })
                        client.release()
                    })
                } else {
                    channel.send(`**No settings were found.**`)
                    //init setup
                    //create a schema "guild_GUILDID" with every table that is needed (setup and quiz)
                    await setup.initDatabase(guild.id)
                    channel.send({
                        content: `Now I'm going to help you setup your settings.\nI'm going to give you all possible options for every question. You can answer the questions I'm going to ask you by **clicking the corresponding button**.\n*Click \`ready\` when you are ready to continue with the setup.*`,
                        components: [setup.getDefaultRow()],
                    })
                }
            })
    })
}
