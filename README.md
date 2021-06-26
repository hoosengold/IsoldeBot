<h1 align="center">
<br>
Multipurpose Discord Bot
<br>
</h1>
<h4 align="center">
Polls, Countdowns, Welcome Greetings, Integration with PostgreSQL
</h3>

<p>
<h5>Table of Contents:</h5>
<ol>
<li> <a href="#overview">Overview</a> </li>
<li> <a href="#features">Features</a> </li>
<li> <a href="#how-to-use-the-bot">How To Use The Bot</a> </li>
<li> <a href="#roadmap">Roadmap</a> </li>
<li> <a href="#license">License</a> </li>
</ol>
</p>

# Overview
This Multipurpose Discord Bot is perfect for small Discord Servers that need an all-in-one solution. It is currently in use - meaning that this repository is being maintained actively. This is NOT a modular bot. Some components can be removed without compromising the integrity of the bot but bugs are to be expected in that case.

# Features
<em>The Multipurpose Bot</em> has the following features:
<ol>
<li><code>*poll</code> command for creating polls with <strong>up to 20 options.</strong> Then the bot reacts automatically to the embeded message. The users can then use the reactions to vote.</li>
<li><code>*countdown</code> command. For now, only hours can be added, but there is no upper limit (as far as the testing concludes). Every embeded message has a timestamp. It can be used as a reference together with the <code>*countdown</code> command.</li>
<li><em>Tight integration with PostgreSQL databases.</em> New tables can be added without any hassle.</li>
<li>Greeting Messages for new guild members.</li>
<li>Command handling with <strong>Collections</strong> - no <code>if-else</code> or <code>switch-case</code> blocks! That way the performance of the bot is a lot better and messages sent by it are almost instant (depending on the quality of the internet connection).</li>
<li><em>Aliases</em> for all commands means that the users don't have to memorise the speficic command names - they can use the names that they find the best.</li>
<li><em>Adding new commands</em> is extremely easy.</li>
</ol>

# How To Use The Bot
<br>
<h4>Prerequisites:</h4>
<ol>
<li>Node.js</li>
<li>Code editor</li>
<li>Git</li>
<li>All packages used in the project (all can be installed through <code>npm</code>):</li>
<ul>
<li>discord.js</li>
<li>dotenv</li>
<li>fs</li>
<li>pg</li>

# <em>The following packages will be used in future releases:</em>

<li>slash-commands</li>
<li>discord-interactions</li>
<li>tweetnacl</li>
<li>axios</li>
</ul>
</ol>
<h4>Setup:</h4>
<ol>
<li>Make a bot in the Discord Developer Portal and add it to the server.</li>
<li>Clone the repository</li>
<li>Install the dependency <a href=#packges> packages </a></li>
<li>Make a <code> .env </code>file in the main folder for all environment variables like the Discord bot token. </li>
<ul>
<li><em>Note: Additionally a <code>config.json</code> file can be created in order to save the environment variables for a testing bot. That way you don't have to change the variables when you wan to test/deploy the bot. Just don't forget to comment the lines, that you don't need, before deploying the bot.</em></li>
</ul>
<li>Put the variables in the <code>.env/cofig.json</code> file. You can use the following template:</li>
>DISCORD_TOKEN= //login token of the bot
>app_id= //bot application id
>public_key= //public key of the bot application
>guild_id= //id of the guild/server
>//the following variables are needed for the database integration
>host=
>password=
>user=
>database=
<li>Change the prefix if you don't like the <code>*</code> prefix.</li>
<li>That's it! The bot is ready to be deployed! <strong>Be sure to follow another guide on how to deploy the bot on the desired platform.</strong></li>
</ol>

# Roadmap

# License