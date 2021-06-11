const Discord = require("../src/node_modules/discord.js");
//var hoursLeft = require('../src/bot.js');

// Set the date we're counting down to
//var timeleft = hoursLeft * 3600000;

// Update the count down every 1 second
function setInterval(message, args) {
  const squigglyRegex = RegExp(/{(.*?)}/),
    dateParameters = args.join(' ');
    //timeRegex = RegExp(/{(\h)}/), //time format, should only read hours and not dates
    
  console.log(squigglyRegex.exec(dateParameters));
  var countDownDate = new Date(dateParameters).getTime();

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Initial time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


  //Set hoursLeft variable for messaging every hour
  var hoursLeft = hours;

  message.channel.send('Time left: ' + days + 'days ' + hours + 'hours ' + minutes + 'minutes and ' + seconds + 'seconds.');

  //Message the remaining time every hour
  while (true){
    // Time calculations for days, hours, minutes and seconds
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
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
  }
};

module.exports = setInterval;