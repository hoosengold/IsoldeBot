<h1 align="center">
<br>
IsoldeBot
<br>
</h1>
<h4 align="center">
Polls, Quiz, Welcome Greetings, Integration with PostgreSQL
</h3>

<p>
<h5>Table of Contents:</h5>
<ol>
<li> <a href="#overview">Overview</a> </li>
<li> <a href="#commands">Commands</a> </li>
<li> <a href="#how-to-use-the-bot">How To Use The Bot</a> </li>
<li> <a href="#roadmap">Roadmap</a> </li>
<li> <a href="#credits">Credits</a> </li>
</ol>
</p>

# Overview
IsoldeBot is a Multipurpose Discord Bot based on discord.js. It is perfect for small Discord Servers that need an all-in-one solution. It is currently in use - meaning that this repository is being maintained actively. This is NOT meant to be a modular bot. Some components can be removed without compromising the integrity of the bot but bugs are to be expected in that case.

# Commands
<em>IsoldeBot</em> has the following commands:

| **Command** | **Description** | **Syntax** |**Notes** |
|-------------|-----------------|------------|---------------|
| `command` | description | `syntax` | `notes` |

<table>
    <thead>
        <tr>
            <th>Commands</th>
            <th>Description</th>
            <th>Syntax</th>
            <th>Parameters</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>poll</td>
            <td>Makes a poll with reactions.</td>
            <td>*poll question? option1! option2! ... option20!</td>
            <td>
                <ul>
                    <li>Questions/options can be fairly long, still have to stay below ca. 80 characters;</li>
                    <li>Max. 20 options;</li>
                    <li>Everyone can post polls.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table> 

# How To Use The Bot
<br>
<h4>Prerequisites:</h4>
<ol>
<li>Node.js</li>
<li>Code editor</li>
<li>Git</li>
<li>All dependency packages used in the project:</li>
<ul>
<li>discord.js</li>
<li>dotenv</li>
<li>pg</li>


<em>The following packages DO NOT affect the functionality of IsoldeBot:</em>

<li></li>
</ul>
</ol>
<h4>Setup:</h4>
<ol>
<li>Make a new Discord Application in the <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a>. Create a new bot and add it to the server.</li>
<li>Fork this repository.</li>
<ul>
<li><em>You need a GitHub account. If you don't have one, <a href="https://github.com/join">create one</a>! It's free!</em></li>
<li><em>You can follow <a href="https://docs.github.com/en/get-started/quickstart/fork-a-repo">this guide</a> on how to fork a repository.</em></li>
</ul>
<li>Install the dependency packages. </a></li>
<ul>
<li><em>You can install the packages by running <code>npm install</code>. Make sure that you are in the root folder. This will create a <code>node_modules</code> folder the first time you run the command. All dependencies will installed in that folder afterwards.</em></li>
<li>You can use <code>npm list</code> to list all installed dependencies. If a dependency did not get installed by running <code>npm install</code>, you can use <code>npm install &ltmodule_name&gt. </code></li>
</ul>
<li>Make a <code> .env </code>file in the root folder for all environment variables like the Discord bot token. </li>
<ul>
<li>Put the environment variables in the <code>.env</code> file. You can use the following template:</li>

```
DISCORD_TOKEN= //login token of the bot
app_id= //bot application id
public_key= //public key of the bot application
guild_id= //id of the guild/server

//the following variables are needed for the database integration
host=
password=
user=
database=
```

<li>Change the prefix if you don't like the <code>*</code> prefix.</li>
<li>That's it! The bot is ready to be deployed! <strong>Make sure to follow another guide on how to deploy the bot on the desired platform.</strong></li>
</ol>
<h4>Adding new commands:</h4>
<ol>
<li>Make a new folder in <code>util/</code> and create a new <code>.js</code> file in it or put the new <code>.js</code> file in a folder that already exists (the command hadling will not work properly, if the command file is not in a subfolder of <code>util/</code>)</li>
<li>Write your new command in the file. Here is a template you can use:</li>

```
module.exports = {
    name: '', //name of the command
    description: '', //short description of the command
    aliases: ['', '', ...], //aliases for the command
    cooldown: 2, //cooldown for the command in seconds, the default cooldown is 5 seconds
    args: true, //does the command have arguments, type false if it doesn't and remove args in execute
    execute(message, args) {
    //put your code here, you can list dependencies here or before module.exports
    }
}
```

<li>You can test the bot with <code>node index.js</code>.</li>
<li>That's it! You can update <code>help.js</code>, <code>aliases.js</code> and <code>changelog.js</code> so that they include your new command.</li>
</ol>

# Roadmap
<ul>
<li>Implement slash commands,</li>
<li>Add automod features like scanning links and files for potential threats,</li>
<li>General bug fixes and performance improvements;</li>
</ul>

# Credits

IsoldeBot has been built with the help of:

<ul>
    <li><a href="https://discordjs.guide/">Discord.js Guide</a>;</li>
    <li><a href="https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url">URL Regex</a>;</li>
    <li>Used Docs:</li>
    <ul>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/javascript">JavaScript MDN Web Docs</a></li>
        <li><a href="https://nodejs.org/en/docs/">Node.js Docs</a></li>
        <li><a href="https://discord.js.org/#/docs/main/stable/general/welcome">Official Discord.js Docs</a></li>
        <li><a href="https://discord.com/developers/docs/intro">Discord Developer Portal Docs</a></li>
        <li>Official Docs/Guides of all dependencies</li>
    </ul>
</ul>
