const { Message, Permissions, Interaction, MessageEmbed, MessageAttachment } = require('discord.js'),
    { Util } = require('../../typescript/dist/typescript/src/Util'),
    db = require('../../utils/database/database'),
    { Setup } = require('../../typescript/dist/typescript/src/Setup'),
    index = require('../../index')

module.exports = {
    name: 'setup',
    description:
        "Initiate an initial setup for a guild, if it wasn't done, when the bot first joined the guild. Can also be used if the owner wants to change something.",
    aliases: ['init', 'firstsetup'],
    cooldown: 10,
    permissions: 'owner',
    syntax: 'setup',
    args: false,
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     */
    async execute(message, args, utilObject) {
        //TODO custom notification role
        if (!utilObject.isOwner()) {
            message.delete().catch(console.error())
            return message.channel.send(`**Only the owner can use the \`${this.name}\` command!**`)
        }

        setTimeout(() => {
            message.delete().catch(console.error())
        }, 1000)

        const channelName = message.guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'setup')
        if (!channelName) {
            message.guild.channels
                .create('isoldebot-setup', {
                    reason: 'Setup IsoldeBot',
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [
                        {
                            id: utilObject.getGuild().roles.everyone,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                        },
                    ],
                })
                .then(async () => {
                    message.channel
                        .send(
                            `New channel ("isoldebot-setup") created. Please continue the setup there. (If you do not see the channel or any buttons there after a 10 seconds, run \`*setup\` again.)`
                        )
                        .then((message) => {
                            setTimeout(() => {
                                message.delete().catch(console.error())
                            }, 100000)
                        })
                    await this.handle(
                        message.guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'isoldebot-setup'),
                        utilObject
                    )
                })
        } else {
            await this.handle(
                message.guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'isoldebot-setup'),
                utilObject
            )
        }
    },

    async handle(channel, utilObject) {
        channel.send(`The setup will begin shortly, let me fetch your current settings. This can take a couple of seconds...`)
        let existBool = new Boolean()
        await db.getClient().then(async (client) => {
            let text = `SELECT exists(select schema_name FROM information_schema.schemata WHERE schema_name = 'guild_${utilObject.getGuildId()}');`
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
                        await db.getClient().then(async (client) => {
                            let text = `SELECT * from guild_${utilObject.getGuildId()}.settings`
                            client
                                .query({
                                    text: text,
                                    rowMode: 'array',
                                })
                                .then((result) => {
                                    channel.send({
                                        content: `The following settings were found:\n\nNotification channel: **${result.rows[0][1]}**\nPrefix: **${result.rows[0][0]}**\n\nYou can change your prefix at any time. The guild members will be notified of the change in the IsoldeBot notification channel, if you choose to have one. (Only the prefix and the optional notification channel can be changed at the moment. Ideas are always welcome! Please refer to the official GitHub repo for more info!). Press "Confirm to display the buttons."`,
                                        components: [setup.getDefaultRow()],
                                    })
                                })
                            client.release()
                        })
                    } else {
                        channel.send(`**No settings were found.**`)
                        //init setup
                        //create a schema "guild_GUILDID" with every table that is needed (setup and quiz)
                        await setup.initDatabase(utilObject.getGuildId())
                        channel.send({
                            content: `Now I'm going to help you setup your settings.\nI'm going to give you all possible options for every question. You can answer the questions I'm going to ask you by **clicking the corresponding button**.\n*Click \`ready\` when you are ready to continue with the setup.*`,
                            components: [setup.getDefaultRow()],
                        })
                    }
                })
        })
    },

    /**
     *
     * @param {Interaction} interaction
     */
    ready(interaction) {
        console.log(`Ready button pressed...`)
        const setup = new Setup()
        const profilePic = new MessageAttachment('./images/git_profile-pic.png')
        const msg = new MessageEmbed()
            .setAuthor({ name: 'hoosengold', iconURL: 'attachment://git_profile-pic.png', url: 'https://github.com/hoosengold/IsoldeBot' })
            .setColor('RED')
            .setTitle('IsoldeBot Setup Menu')
            .setDescription('Setup commands for IsoldeBot')
            .setTimestamp(new Date())
            .addField(
                'General Notes:',
                'You can choose as many options as you want, but only the **last one** will be counted towards the settings. ' +
                    'For example: You choose _*_ as your prefix, then you change your mind and choose **&**, but then you click on ' +
                    '**<**. In this case your prefix will be set to **<**. The changes take effect **immediately.**\n\n' +
                    'Default settings:\nNotification channel: **no**\nPrefix: * (asterisk)' +
                    '\n\nYou can change the prefix at any time. All server members will get notified of the change. \nYou can also delete the notification channel at any point and then create it again by using the button. ' +
                    "The setup channel won't be deleted automatically. You can always delete it, if you would like to. It will get created again, when you use `*setup`"
            )

        const msgNotifCh = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Notification channel')
            .setDescription(
                "*Do you want to have a notification channel for all changes to IsoldeBot? If you choose to have one, all changes to the prefix + updates will be logged there. If you don't want to have such channel, the updates will be posted in general.*"
            )

        const msgPrefix = new MessageEmbed().setColor('AQUA').setTitle('Prefix').setDescription('*What prefix do you prefer?*')

        interaction
            .reply({
                embeds: [msg, msgNotifCh],
                files: [profilePic],
                components: [setup.getYesNo()],
            })
            .then(() => {
                interaction.channel.send({
                    embeds: [msgPrefix],
                    components: [setup.getSelectMenu()],
                })
            })
    },

    /**
     *
     * @param {Interaction} interaction
     */
    async prefix(interaction) {
        console.log('Prefix button pressed...')
        let prefix
        await db.getClient().then(async (client) => {
            let text = `SELECT prefix FROM guild_${interaction.guildId}.settings`
            client
                .query({
                    text: text,
                    rowMode: 'array',
                })
                .then((result) => {
                    prefix = result.rows[0][0]
                })
                .then(() => {
                    text = `UPDATE guild_${interaction.guildId}.settings
SET prefix='${interaction.values[0]}'
WHERE prefix='${prefix}';`
                    client.query(text)
                })
                .then(() => {
                    interaction.reply({
                        content: `Prefix changed to **${interaction.values[0]}**`,
                        ephemeral: false,
                    })
                    console.log(`Prefix for ${interaction.guild.name} changed to ${interaction.values[0]}`)
                })
            client.release()
        })
        prefix = interaction.values[0]
        index.prefixes.set(interaction.guildId, prefix)
        let ch = interaction.guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'isoldebot')
        if (!ch) {
            ch = interaction.guild.channels.cache.find((ch) => ch.name.toLowerCase() === 'general')
        }

        ch.send(
            `@everyone The prefix for IsoldeBot was changed to "**${interaction.values[0]}**" by the owner of the server. The old prefix will no longer work.`
        )
    },

    /**
     *
     * @param {Interaction} interaction
     */
    async yes(interaction) {
        console.log(`Yes button pressed...\nCreating notif channel...`)
        const ch = interaction.guild.channels.cache.findKey((ch) => ch.name.toLowerCase() === 'isoldebot')
        if (ch) {
            await db.getClient().then(async (client) => {
                let text = `UPDATE guild_${interaction.guildId}.settings
SET notif_channel='yes';`
                client.query({
                    text: text,
                })
                client.release()
            })
            console.log(`The notification channel already exists. Nothing was changed`)
            return interaction.reply({
                content: 'The notification channel already exists. Nothing was changed',
                ephemeral: true,
            })
        } else {
            interaction.guild.channels
                .create('isoldebot', {
                    reason: 'IsoldeBot Notification channel',
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                            deny: [
                                Permissions.FLAGS.MANAGE_CHANNELS,
                                Permissions.FLAGS.MANAGE_MESSAGES,
                                Permissions.FLAGS.MANAGE_GUILD,
                                Permissions.FLAGS.MANAGE_NICKNAMES,
                                Permissions.FLAGS.MANAGE_ROLES,
                                Permissions.FLAGS.MANAGE_WEBHOOKS,
                                Permissions.FLAGS.SEND_MESSAGES,
                            ],
                        },
                    ],
                })
                .then(async () => {
                    await db.getClient().then(async (client) => {
                        let text = `UPDATE guild_${interaction.guildId}.settings
SET notif_channel='yes';`
                        client.query({
                            text: text,
                        })
                        client.release()
                    })
                    interaction.reply({
                        content: `Notification channel for IsoldeBot created. Make sure to check the default permissions made by me.`,
                        ephemeral: false,
                    })
                })
        }
    },

    /**
     *
     * @param {Interaction} interaction
     */
    async no(interaction) {
        await db.getClient().then(async (client) => {
            let text = `UPDATE guild_${interaction.guildId}.settings
SET notif_channel='no';`
            client.query(text)
            client.release()
        })
        interaction.reply({
            content: `The notification won't be created by me. If it already exists, you can delete it.`,
            ephemeral: false,
        })
    },

    /**
     *
     * @param {Interaction} interaction
     */
    help(interaction) {
        const text =
            "The setup channel is setup to be a private channel. It won't get deleted after the setup" +
            ' is done in order for you to be able to change the settings at any time. The settings take effect immediately, you' +
            " don't have to confirm anything at the end. You can choose between 17 different prefix types. Only 1 of them can" +
            ' be active at a time. After a prefix change everyone will be notified either in the IsoldeBot Notification channel or in' +
            ' general (that is if you opt out of the notification channel). The notification channel will be used for everything related' +
            " to IsoldeBot (updates, prefix changes). For now it won't be very active channel. You can always create it yourself" +
            ' (although bugs are to be expected in that case). Nobody except the owner can use the setup command, double check if' +
            ' only the owner can see the setup channel in order to avoid abuse of the customization. More customization is planned.'
        return interaction.reply({
            content: text,
            ephemeral: true,
        })
    },
}
