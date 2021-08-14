module.exports = {
	name: 'event',
	description: 'Event handler for the quiz',
	execute(interaction) {
		const Discord = require('discord.js');
		const db = require('../../../utils/database/database');
		const crypto = require('crypto');
		require('dotenv').config();

		let buttonID = interaction.component.customId;
		let questionID = buttonID.split('question')[1];
		let questionColumn = 'question' + questionID;

		(async () => {
			try {
				var userID = await interaction.member.id;
				const secret = process.env.secret;
				const hasher = crypto.createHmac('sha256', secret);
				var hashedID = hasher.update(userID).digest('hex');
				userID = '';

				await db
					.getClient()
					.then(async (client) => {
						//check if the entry is in the database
						await client
							.query('select user_id from quiz_users where user_id = $1', [hashedID])
							.then(async (result) => {
								if (result.rows.length === 0) {
									//if it isn't, add it
									await client.query('insert into quiz_users values ($1)', [hashedID]);
									console.log(`ID added successfully.`);
								} else {
									//if it is, send message
									console.log(`ID already added.`);
								}

								//query the selected answer
								let columnQuery = `ALTER TABLE quiz_users ADD COLUMN IF NOT EXISTS ${questionColumn} VARCHAR(20)`;
								await client
									.query(columnQuery)
									.then(async () => {
										let query = `update public.quiz_users set ${questionColumn}=$1 where user_id=$2`;
										await client.query(query, [buttonID, hashedID]);
									})
									.catch(console.error());

								//release the client
								client.release();
								console.log(`Client released successfully.`);
							})
							.catch(console.error());
					})
					.catch(console.error());
			} finally {
				await interaction.reply({
					content: 'Answer submitted successfully!',
					ephemeral: true,
				});
				console.log(`Button event executed successfully.`);
			}
		})().catch((err) => {
			console.log(err.stack);
		});
	},
};
