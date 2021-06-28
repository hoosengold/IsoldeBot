const Discord = require('discord.js');
const client = new Discord.Client({ //initialize client for the bot;
    presence: {
        status: 'online',
        activity: {
            name: '*help',
            type: 'PLAYING'
        }
    }
});
const prefix = "*", //prefix for all commands
    config = require('./config.json'), //Login with test bot
    fs = require('fs');
//webHookHelper = require('discord-interactions'),
//{ DiscordInteractions, ApplicationCommandOptionType } = require('slash-commands'),
//slash = require('./slash_commands/testcommand.js');


client.commands = new Discord.Collection(); //make new collection for the commands
client.cooldowns = new Discord.Collection(); //make new collection for the cooldowns

const commandFolders = fs.readdirSync('./util') //find the command files

//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./util/${folder}`).filter(file => file.endsWith('.js')) //filter the command files
    for (const file of commandFiles) {
        const command = require(`./util/${folder}/${file}`);
        client.commands.set(command.name, command)
    }
}


//Login with deploy bot
//require('dotenv').config();
//client.login(process.env.DISCORD_TOKEN);

//Login with test bot
client.login(config.token); //comment out config require

//initialize interactions
/*const interaction = new DiscordInteractions({
    //applicationId: process.env.app_id,  //deploy
    //authToken: process.env.DISCORD_TOKEN, 
    //publicKey: process.env.public_key,

    applicationId: config.app_id, //test
    authToken: config.token,
    publicKey: config.public_key,
})

if (interaction) {
    console.log(`Interaction initialization: Done`)
} else {
    console.error
}*/



//Print Ready in the console when the bot is ready
client.once("ready", () => {
    //the bot is ready
    console.log(`Ready!`)
})

//listen for joining users
client.on("guildMemberAdd", (member) => {
    console.log(`New member detected.`)
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general')
    if (!channel) return;
    channel.send(`Welcome to the Stream Fam, ${member}! Don't forget to claim your welcome \`*hug\`! :purple_heart:`)
})

//listen for messages, main function of the bot
client.on('message', function (message) {
    const urlRegexMain = new RegExp(/^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/gmi);
    const urlRegexAlphanumeric = new RegExp(/^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?$/gmi);
    const urlRegexIPv4 = new RegExp(/^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))$/img);
    const urlRegexIPv6 = new RegExp(/^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(([\da-fA-F]{0,4}:){1,7}[\da-fA-F]{0,4})$/);
    
    const testURL = ['www.google.com', 'http://www.google-com.123.com', 'http://www.google.com',
        'http://www.google-com.123', 'https://www.google-com.com', 'http://google-com.com', 'http://google.com',
        'google.com', 'http://www.gfh.', 'http://www.gfh.c', 'http://www.gfh:800000', 'www.google.com ',
        'http://google', '//cdnblabla.cloudfront.net/css/app.css', "//www.google.com",
        "//cdnblabla.cloudfront.net/css/app.css", "http://✪df.ws/123",
        "http://userid:password@example.com:8080", "http://userid:password@example.com:8080/",
        "http://userid@example.com", "http://userid@example.com/", "http://userid@example.com:8080",
        "http://userid@example.com:8080/", "http://userid:password@example.com",
        "http://userid:password@example.com/", "http://142.42.1.1/", "http://142.42.1.1:8080/",
        "http://➡.ws/䨹", "http://⌘.ws", "http://⌘.ws/", "http://foo.com/blah_(wikipedia)#cite-1",
        "http://foo.com/blah_(wikipedia)_blah#cite-1", "http://foo.com/unicode_(✪)_in_parens",
        "http://foo.com/(something)?after=parens", "http://☺.damowmow.com/",
        "http://code.google.com/events/#&product=browser", "http://j.mp", "ftp://foo.bar/baz",
        "http://foo.bar/?q=Test%20URL-encoded%20stuff", "http://مثال.إختبار", "http://例子.测试",
        "http://", "http://.", "http://..", "http://../", "http://?", "http://??", "http://??/",
        "http://#", "http://##", "http://##/", "http://foo.bar?q=Spaces should be encoded", "//",
        "//a", "///a", "///", "http:///a", "foo.com", "rdar://1234", "h://test", "http:// shouldfail.com",
        ":// should fail", "http://foo.bar/foo(bar)baz quux", "ftps://foo.bar/", "http://-error-.invalid/",
        "http://-a.b.co", "http://a.b-.co", "http://0.0.0.0", "http://10.1.1.0", "http://10.1.1.255",
        "http://224.1.1.1", "http://1.1.1.1.1", "http://123.123.123", "http://3628126748",
        "http://.www.foo.bar/", "http://www.foo.bar./", "http://.www.foo.bar./", "http://10.1.1.1",
        "http://10.1.1.254"]

        var t = 0;
        var f = 0;
        testURL.forEach(element => {
            if(urlRegexMain.test(element)|urlRegexAlphanumeric.test(element)|urlRegexIPv4.test(element)|urlRegexIPv6.test(element)){
                t++;
            }else{
                f++;
            }
            console.log(`${element}: ${urlRegexMain.test(element)}`)
        });
        console.log(`true: ${t}`)
        console.log(`false: ${f}`)
    

    //checks if the author of the message is a bot, if it is, then it does not respond
    if (message.author.bot) return;

    //check for youtube links
    if (message.content.includes('youtube.com/')) {
        message.reply(`You can also use \`*addMusic\` to suggest music to others. The link is kept secure and it won't be lost among the other messages. And a lucky Stream Fam can get a chance to listen to your suggestion when they type \`*getMusic\` :purple_heart:`)
    }

    if (!message.content.startsWith(prefix) || message.content.endsWith(prefix)) return; //checks if the message starts or ends with *

    //takes the message body, removes the prefix !, splits the message body and makes everything lower case
    const args = message.content.slice(prefix.length).split(/ +/), //returns args[] where [0] is the first word arfter the command
        commandName = args.shift().toLowerCase(); //returns the command

    console.log(`command: ${commandName}`)
    console.log(`args: ${args}`)

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return; //check is the command exists

    //cooldown for the specific command for the specific user
    const { cooldowns } = client

    //check if the cooldown collection already has a cooldown for the command
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now(),
        timestamps = cooldowns.get(command.name),
        cooldownAmount = (command.cooldown || 5) * 1000;

    //execute the command
    try {
        //get the timestamp and calculate the remaining time if the user already used the command in this session
        if (timestamps.has(message.author.id)) {
            const expirationDate = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationDate) { //checks if there is still cooldown
                const timeLeft = (expirationDate - now) / 1000
                return message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) before using the ${command.name} command again.`)
            }
        }

        //clear the entry on the collection after the cooldown
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        //execute the command
        command.execute(message, args)
    } catch (error) {
        console.log(error)
        message.reply(`Something went wrong while trying to execute the command!`)
    }


    //slash(interaction, client)

});