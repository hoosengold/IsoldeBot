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

<em>The following # packages will be used in future releases:</em>

<li>slash-commands</li>
<li>discord-interactions</li>
<li>tweetnacl</li>
<li>axios</li>
</ul>
</ol>
<h4>Setup:</h4>
<ol>
<li>Clone the repository</li>
<li>Install the dependency <a href=#packges> packages </a></li>
</ol>

# Roadmap

# License