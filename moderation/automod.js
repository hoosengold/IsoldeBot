const Discord = require('discord.js'),
	//config = require('../config.json'),
	roles = require('../index.js')

async function automod(url) {
	try {
		console.log(`Test passed! url: ${url}`)
	} catch {
		console.error()
	}
}

module.exports = automod
