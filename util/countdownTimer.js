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

  //Message when the countdow ends
  message.channel.send('The Countdown will end after ' + hoursLeft + ' hours on **' + countdownDate + '**');

  setInterval(function () {
    // Get today's date and time
    var now = new Date();
    console.log("now: " + now);

    // Find the distance between now and the count down date
    var distance = countdownDate - now;
    console.log("distance: " + distance);

    //Message everyone at the ;ast 1 hour/30 minutes
    if (distance < 3600100 && distance > 3599900) {
      message.channel.send("Only 1 hour left!");
    } else if (distance < 1800100 && distance > 1799900) {
      message.channel.send("Only 30 minutes left!");
    } else if (distance <= 0) {
      message.channel.send('@everyone The time has expired!'); // If the count down is finished, write some text
    }
  }, 1000);
}

module.exports = countdown;