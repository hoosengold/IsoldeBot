//Array with emojis for react(), currently not used, see line 53 for reactions array
//const reactArray = require("../util/reactArray");

//Import all required modules
const Discord = require("../node_modules/discord.js"),
    //setInterval = require('../util/countdownTimer.js'),
    emojiArray = require("../util/emojiArray.js");

function poll(message, args){
    //format the output/messsage body
        const squigglyRegex = RegExp(/{(.*?)}/),
            squareRegex = RegExp(/\[[^[]+\]/g), 
            //timeRegex = RegExp(/{(\h)}/), //time format, should only read hours and not dates
            pollParameters = args.join(' '),
            pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
    
            console.log(squigglyRegex.exec(pollParameters));
    
        //checks if the command has title
        if (!pollTitle){
                return message.channel.send('No poll title specified. Type !help for more info.').catch(err => console.log(err));
        }
    
    
        //
        pollParameters.replace(`{${pollTitle}}`, '');
        const pollsArray = pollParameters.match(squareRegex);
    
    
        //checks if the command has options and if they are more than 20
        if(!pollsArray){
            return message.channel.send('No poll options specified. Type !help for more info.').catch(err => console.log(err));
        } else if (pollsArray.length > 20){
            return message.channel.send('Max. 20 poll options allowed.').catch(err => console.log(err));
        }
    
        //should take the hours from the args and separate it
        /*const timedPoll = timeRegex.test(args[0]) ? timeRegex.exec(args[0])[0] : null;
        console.log("timedPoll: " + timedPoll);*/
        
        //creates the poll message
        let i = 0;
        const pollMessage = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
        
        //poll message format and content
        const embed = {
            color: 'PURPLE',
            title: pollTitle,
            description: pollMessage,
        }
    
    
        //array with the reactions amojis
        const reactions = ['🇦',
                            '🇦',
                            '🇧',
                            '🇨',
                            '🇩',
                            '🇪',
                            '🇫',
                            '🇬',
                            '🇭',
                            '🇮',
                            '🇯',
                            '🇰',
                            '🇱',
                            '🇲',
                            '🇳',
                            '🇴',
                            '🇵',
                            '🇶',
                            '🇷',
                            '🇸',
                            '🇹'];
    
        //messages the poll and then reacts to it with the reactions[]
        const msg = message.channel.send({embed: embed}).catch(err => console.log(err))
        .then (function (message){
            for(let j = 0; j < i + 1; j++){
                message.react(reactions[j])
            }
        });
    
    
        //checks if the poll is timed, if it is, it starts a countdown timer, see countdownTimer.js, work in progress
        /*if(timedPoll){
            var hoursLeft = timeRegex.exec(args[1])[1];//should only take the hours argument
            console.log("hoursLeft:" + hoursLeft);
            message.channel.send('You have ' + hoursLeft + 'hours left to vote!');
            return setInterval(hoursLeft);
        }*/
}

module.exports = poll;