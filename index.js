const { Client, Intents, Collection } = require('discord.js'),
    fs = require('fs'),
    db = require('./utils/database/database')

//FIXME fix dynamic dynamic requre (__dirname)

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
const commandFolders = fs.readdirSync('./commands') //find the command files
//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')) //filter the command files
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

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
