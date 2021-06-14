const Discord = require("../node_modules/discord.js");
var hoursLeft = require('../bot.js');

// Set the date we're counting down to
//var timeleft = hoursLeft * 3600000;

// Update the count down every 1 second
function countdown(message, args){
    //Parse the amount of hours into variable
    hoursLeft = parseInt(args[0]);

    //Get the date when the countdown should end
    var countdownDate = new Date();
    countdownDate.setUTCHours(countdownDate.getUTCHours() + hoursLeft);

    //Message when the countdow ends
    message.channel.send('The Countdown will end after ' + hoursLeft + ' hours on **' + countdownDate +'**');

    setInterval(function() {
      // Get today's date and time
      var now = new Date();
      console.log("now: " + now);

      // Find the distance between now and the count down date
      var distance = countdownDate - now;
      console.log("distance: " + distance);
      
      //Set hoursLeft variable for messaging every hour
      var hours = hoursLeft;
      
      /*
      //Message the remaining time every hour
      while (true){
            
        if(hoursLeft = hours){
          continue;
        } else if (hoursLeft < hours) {
          console.error();
        } else if (hoursLeft > hours){
          message.channel.send('Only ' + hours + 'hours left!');
          hoursLeft--;
        } else if (hours = 0){
          message.channel.send('@everyone Only 1 hour left!');
          break;
        }
      }

      // If the count down is finished, write some text
      if (distance < 0) {
        return message.channel.send('@everyone Voting time has expired!');
      }*/
  }, 1000);
}

module.exports = countdown;