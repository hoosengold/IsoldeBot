//Import all required modules
const Discord = require("../node_modules/discord.js"),
    fsLib = require('fs');
var musicSuggestion = require('../bot.js');

//Initialize hash map to store the data
let musicMap = new Map();

//The function of the command
function music(message, args) {
    //Save the link in a variable
    /*if (musicMap.size == 0) {
        fsLib.readFile('./text/music-backup.txt', (error, textInFile) => {
            if (error) throw error;
        })
    }*/ //Need to find another way to make backups
    musicSuggestion = args[0];
    //check if the link is already in the map
    if (musicMap.has(musicSuggestion)) {
        //send a message if it is
        message.channel.send("The song is already added. Happy listening! :purple_heart:");
        console.log("Music hash map size:" + musicMap.size);
    } else { //if it's not, add it
        //extract video ID from the link
        //const videoID = musicSuggestion.split('v=')[1];

        //set the link as key, value is link + title
        musicMap.set(musicSuggestion, { musicSuggestion });
        console.log("Music hash map size:" + musicMap.size);
        message.channel.send('The Song has been successfully added. Thank you for the suggestion! :purple_heart:');

        //add the link to the backup file
        /*fsLib.writeFile('./text/music-backup.txt', musicSuggestion + '\n', (error) => {
            if (error) throw error;
        })*/
    }
}

//Export the module so that it can be used by bot.js
module.exports = music;