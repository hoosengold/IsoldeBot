module.exports = {
  name: "gui", //name of the command
  description: "GUI frontend for IsoldeBot", //short description of the command
  aliases: ["frontend", "website", "site"], //aliases for the command
  cooldown: 2, //cooldown for the command in seconds, the default cooldown is 5 seconds
  args: false, //does the command have arguments, type false if it doesn't and remove args in execute
  execute(message) {
    message.reply(`You can access the GUI be clicking [here]().`);
  },
};
