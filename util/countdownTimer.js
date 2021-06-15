const Discord = require("../node_modules/discord.js");
var hoursLeft = require('../bot.js');

// Update the count down every 1 second
function countdown(message, args) {
  //Parse the amount of hours into variable
  hoursLeft = parseInt(args[0]);

  //Get the date when the countdown should end
  var countdownDate = new Date();
  countdownDate.setUTCHours(countdownDate.getUTCHours() + hoursLeft);

  //Message when the countdown ends
  if (hoursLeft = 1) {
    message.channel.send('The Countdown will end after **' + hoursLeft + ' hour** on *' + countdownDate + '*');
  } else {
    message.channel.send('The Countdown will end after **' + hoursLeft + ' hours** on *' + countdownDate + '*');
  }

  var messageCountHour = 0;
  var messageCountMinute = 0;

  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date();

    // Find the distance between now and the count down date
    var distance = countdownDate - now;

    //Calculate remaining hours and minutes
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    console.log("hours: " + hours);
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    console.log("minutes: " + minutes);

    //Message everyone at the last 1 hour/30 minutes

      if (hours == 1 && messageCountHour == 0) {
        message.channel.send("Only **1 hour** left!");
        messageCountHour++;
      } else if (minutes == 30 && hours == 0 && messageCountMinute == 0) {
        message.channel.send("Only **30 minutes** left!");
        messageCountMinute++;
      }
    
    // If the countdown is finished, send message
    if (distance <= 0) {
      clearInterval(x);
      message.channel.send('The time has expired!');
    }
  }, 1000);
}

module.exports = countdown;