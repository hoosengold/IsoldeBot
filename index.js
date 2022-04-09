const { Client, Intents, Collection } = require('discord.js'),
    fs = require('fs'),
    path = require('path'),
    db = require(path.join(__dirname, '/utils/database/database'))

//FIXME fix dynamic dynamic require (__dirname)

/*
Possible Intents:

Intents.FLAGS.GUILD_MEMBERS
Intents.FLAGS.GUILD_PRESENCES 
Intents.FLAGS.GUILDS
Intents.FLAGS.GUILD_BANS 
Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
Intents.FLAGS.GUILD_WEBHOOKS
Intents.FLAGS.GUILD_MESSAGE_REACTIONS

Bitfield (all Intents): 1327
*/

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit(1)
})

const client = new Client({
    presence: {
        status: 'online',
        activity: {
            name: '*help',
            type: 'PLAYING',
        },
    },
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
})

exports.client = client

client.commands = new Collection() //make new collection for the commands
const commandFolders = fs.readdirSync(path.join(__dirname, '/commands')) //find the command files
//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, `/commands/${folder}`)).filter((file) => file.endsWith('.js')) //filter the command files
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, `/commands/${folder}/${file}`))
        client.commands.set(command.name, command)
    }
}

const eventFiles = fs.readdirSync(path.join(__dirname, './events')).filter((file) => file.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(path.join(__dirname, `/events/${file}`))
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

const prefixes = new Collection()
client.guilds.fetch().then((res) => {
    res.forEach((element) => {
        db.getClient().then(async (client) => {
            let text = `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'guild_${element.id}' AND tablename = 'settings');`
            await client
                .query({
                    text: text,
                    rowMode: 'array',
                })
                .then(async (result) => {
                    if (result.rows[0][0]) {
                        text = `SELECT prefix FROM guild_${element.id}.settings`
                        await client
                            .query({
                                text: text,
                                rowMode: 'array',
                            })
                            .then((res) => {
                                prefixes.set(element.id, res.rows[0][0])
                            })
                    }
                })
            client.release()
        })
    })
})

exports.prefixes = prefixes

const ticTacToeUsers = new Collection()

exports.ticTacToeUsers = ticTacToeUsers

//Login with the bot
require('dotenv').config()
client.login(process.env.DISCORD_TOKEN).catch((err) => console.error(err))

/*client.on('clickButton', async function (button) {
    console.log(`clickButton event triggered`)
    events.execute(button)
})*/

let pool = db.pool
//listen for an error from an idle pool client
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(0)
})
