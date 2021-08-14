module.exports = {
  name: "help",
  description: "Provide help menu with all available commands",
  aliases: ["helpmenu", "menu"],
  cooldown: 5,
  args: false,
  execute(message) {
    const Discord = require("discord.js");
    const fs = require("fs");
    const profilePic = new Discord.MessageAttachment(
      "./images/git_profile-pic.png"
    );

    const helpEmbed = {
      color: "RANDOM",
      title: "Help Menu",
      author: {
        name: "hoosengold",
        icon_url: "attachment://git_profile-pic.png",
        url: "https://github.com/hoosengold/IsoldeBot",
      },
      description:
        "A comprehensive list with all commands and how to use them.",
      fields: [
        {
          name: "** *poll** `question? option1! option2! ... option20!`",
          value:
            "Example: \n `*poll Do you like the polls? Yes! Of course! Best polls ever!` \n *Note:* Each poll can have **up to 20 options**.",
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "** *countdown** `hours`",
          value:
            "Example: `*countdown 6` \n Adds 6 hours to the countdown timer. \n *Note:* At least 1 hour has to be added, no upper limit (but be reasonable). Sends a message when 1 hour/30 minutes is left and when no time is left.",
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "** *hug**",
          value:
            "Example: `*hug @someone` \n Returns a hug. \n *Note:* The command can be used with or without tagging someone. More than 1 person can be tagged. It returns a different message for 0 tagged and 1 or more tagged.",
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "***say `statement`**",
          value:
            "Example: `*say something definitely meaningful` \n Makes The Friend say anything. No words/characters count limit. \n *Note:* Be responsible. Stick to the server rules. ",
        },
        {
          name: "\u200b",
          value: "\u200b",
        },

        {
          name: "** *updates** ",
          value: "Returns a list with the most recent changes to the bot.",
          inline: true,
        },
        {
          name: "** *story**",
          value: "Returns the lore behind The Friend.",
          inline: true,
        },
        {
          name: "** *commands**",
          value: "Returns a list with commands and their aliases.",
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: "** *bug**",
          value: "Returns a guide how to report a bug.",
          inline: true,
        },
      ],
      //thumbnail: {
      //url: '',
      //},
      timestamp: new Date(),
      footer: {
        text:
          `Last updated: ` +
          fs.statSync("util/help/help.js").mtime.toUTCString(),
      },
    };

    message.channel.send({ embeds: [helpEmbed], files: [profilePic] });
    //delete the call message
    message.delete().catch((err) => console.error(err));
  },
};
