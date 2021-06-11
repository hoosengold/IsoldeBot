//const Discord = require("discord.js"),
var hoursLeft = require('../src/bot.js');

// Set the date we're counting down to
var timeleft = hoursLeft * 3600000;
var countDownDate = new Date().getTime() + timeleft;

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // If the count down is finished, write some text
  if (distance < 0) {
    /*clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";*/
    return message.channel.send('@everyone Voting time has expired!');
  }
}, 1000);