module.exports = {
  name: 'countdown',
  description: 'Countdown timer with hours for input',
  aliases: ['timer', 'countdowntimer', 'timercountdown'],
  cooldown: 5,
  args: true,
  execute(message, args) {
    const Discord = require("discord.js");
    const index = require('../../index')

    //check for mods
    if(!index.isAdmin(message.author.id)){
      setTimeout(() => {
        message.delete()
      }, 1500);
      return message.reply({content: `You don't have the right permsissions to use this command.`, allowedMentions: { repliedUser: true }})
    }
    
    //check for args
    if (args[0] == null) {
      return message.reply('Please specify hours for the countdown.')
        .catch(err => console.log(err))
    }

    //Parse the amount of hours into variable
    hoursLeft = parseInt(args[0])

    //check is hoursLeft is a number
    if (isNaN(hoursLeft)) {
      return message.reply('Only numbers are accepted. No strings allowed.')
        .catch(err => console.log(err))
    }

    if (hoursLeft > 24) {
      return message.reply(`The maximum duration of a countdown cannot exceed 24 hours because of limitations in the hosting platform. Sorry for the inconvenience!`)
    }

    //Get the date when the countdown should end
    var countdownDate = new Date();
    countdownDate.setUTCHours(countdownDate.getUTCHours() + hoursLeft);

    //Message when the countdown ends
    if (hoursLeft == 1) {
      message.reply('The Countdown will end after **' + hoursLeft + ' hour** on *' + countdownDate + '*');
      console.log('Countdown date messaged.');
    } else {
      message.reply('The Countdown will end after **' + hoursLeft + ' hours** on *' + countdownDate + '*');
      console.log('Countdown date messaged.');
    }

    var messageCountHour = 0;
    var messageCountMinute = 0;

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date();

      // Find the distance between now and the count down date
      var distance = countdownDate - now;

      //Calculate remaining hours and minutes
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      //Message everyone at the last 1 hour/30 minutes
      if (hours == 1 && minutes == 0 && messageCountHour == 0) {
        message.channel.send("Only **1 hour** left!");
        messageCountHour++;
        console.log('Message sent: 1 hour left.');
      } else if (minutes == 30 && hours == 0 && messageCountMinute == 0) {
        message.channel.send("Only **30 minutes** left!");
        messageCountMinute++;
        console.log('Message sent: 30 minutes left.');
      }

      // If the countdown is finished, send message
      if (distance <= 0) {
        clearInterval(x);
        message.channel.send("Time's up!");
        console.log('Message sent: time expired.');
      }
    }, 1000);
  }
}