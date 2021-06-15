const Discord = require("../node_modules/discord.js");
var hoursLeft = require('../bot.js');

// Set the date we're counting down to
//var timeleft = hoursLeft * 3600000;

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


  setInterval(function () {
    // Get today's date and time
    var now = new Date();

    // Find the distance between now and the count down date
    var distance = countdownDate - now;

    //Calculate remaining hours and minutes
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    console.log("hours: " + hours);
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    console.log("minutes: " + minutes);

    //Message everyone at the ;ast 1 hour/30 minutes
    if (hours == 1) {
      message.channel.send("Only **1 hour** left!");
    } else if (minutes == 30 && hours == 0) {
      message.channel.send("Only **30 minutes** left!");
    } else if (hours == 0 && minutes == 0) {
      message.channel.send('The time has expired!'); // If the count down is finished, write some text
    }
  }, 1000);
}

module.exports = countdown;