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
<em>IsoldeBot</em> is a Multipurpose Discord Bot based on discord.js. It is perfect for small Discord Servers that need an all-in-one solution. It is currently in use - meaning that this repository is being maintained actively. This is NOT meant to be a modular bot. Some components can be removed without compromising the integrity of the bot but bugs are to be expected in that case.

# Commands
<em>IsoldeBot</em> has the following commands:

<table>
    <thead>
        <tr>
            <th>Commands</th>
            <th>Description</th>
            <th>Syntax</th>
            <th>Notes</th>
            <th>Permissions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>poll</code></td>
            <td>Makes a poll with reactions.</td>
            <td><code>*poll &ltquestion&gt? &ltoption1&gt! &ltoption2&gt! ... &ltoption20&gt!</code></td>
            <td>
                <ul>
                    <li>Questions/options can be fairly long, still have to stay below ca. 80 characters;</li>
                    <li>Max. 20 options.</li>
                </ul>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>countdown</code></td>
            <td>Creates a countdown for a specific amount of hours.</td>
            <td><code>*countdown &lthours&gt</code></td>
            <td>
                <ul>
                    <li>No upper limit;</li>
                    <li>Sends a message when 1 hour/30 minutes are left and when the timer hits 0.</li>
                </ul>
            </td>
            <td><code>moderators</code></td>
        </tr>
        <tr>
            <td><code>say</code></td>
            <td>Makes the bot say something.</td>
            <td><code>*say &ltthings_to_say&gt</code></td>
            <td>
                <ul>
                    <li>The parameter can be up to <em>1024</em> characters.</li>
                </ul>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>aliases</code></td>
            <td>Returns a lsit with the names of all commands and their aliases.</td>
            <td><code>*aliases</code></td>
            <td>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>updates</code></td>
            <td>Returns an embed message with the most recent changes to the bot.</td>
            <td><code>*updates</code></td>
            <td>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>help</code></td>
            <td>Returns an embed message with all commands, their short description and an example on how to use them.</td>
            <td><code>*help</code></td>
            <td>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>lore</code></td>
            <td>Returns an embed message with the story behind the name of the bot in the guild, for which the bot was made. </td>
            <td><code>*lore</code></td>
            <td>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>bug</code></td>
            <td>Returns an embed message with information on how to report a bug or an issue in the bot.</td>
            <td><code>*bug</code></td>
            <td>
            </td>
            <td><code>everyone</code></td>
        </tr>
        <tr>
            <td><code>answer</code></td>
            <td>Takes an answer for one of the quiz questions.</td>
            <td><code>*answer &ltnumber_of_question&gt &ltletter_of_correct_answer&gt</code></td>
            <td>
                <ul>
                    <li>Capital and non-capital letters are accepted;</li>
                    <li>It is not recommended to do use the command in a channel, where everyone can see it.</li>
                </ul>
            </td>
            <td><code>moderator</code></td>
        </tr>
        <tr>
            <td><code>evalquiz</code></td>
            <td>Returns an embed message with the count of correct answers of every participant in the quizzes and notes down the member with the most correct answers.</td>
            <td><code>*evalquiz</code></td>
            <td>
            </td>
            <td><code>moderator</code></td>
        </tr>
        <tr>
            <td><code>quiz</code></td>
            <td>Returns a poll-like embed message, but it uses buttons instead of reactions.</td>
            <td><code>*quiz &ltquestion&gt? &ltoption1&gt! &ltoption2&gt! ... &ltoption5&gt!</code></td>
            <td>
                <ul>
                    <li>Max. 5 options;</li>
                    <li>The question and the options can consist of more than 1 word.</li>
                </ul>
            </td>
            <td><code>moderators</code></td>
        </tr>
        <tr>
            <td><code>hug</code></td>
            <td>
                <ul>
                    <li>If no parameters are passed, it returns a "hug" to the user that sent the message;</li>
                    <li>If 1 or more tagged members are passed, it returns a "hug" to the tagged members.</li>
                </ul>
            </td>
            <td><code>*hug &lttagged_member?&gt</code>
            </td>
            <td>
            </td>
            <td><code>everyone</code></td>
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


<em>The following packages DO NOT affect the functionality of <em>IsoldeBot</em>:</em>

<li>jsdoc</li>
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
<li><em>You can install the packages by running <code>npm install</code>. Make sure that you are in the root folder. This will create a <code>node_modules</code> folder the first time you run the command. All dependencies will be installed in that folder afterwards.</em></li>
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
<li>Implement slash commands;</li>
<li>Implement automod;</li>
<li>Implement "on demand" commands/features;</li>
<li>General bug fixes and performance improvements;</li>
</ul>

# Credits

<em>IsoldeBot</em> has been built with the help of:

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
