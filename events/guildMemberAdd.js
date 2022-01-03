module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        console.log(`New member detected.`)
        const channel = member.guild.channels.cache.find(
            (ch) => ch.name === 'welcome' || ch.name === 'welcome-and-rules' || ch.name === 'welcome-and-goodbye'
        )
        if (!channel) {
            channel = member.guild.channels.cache.find((ch) => ch.name === 'general')
            if (!channel) {
                return
            }
        }
        if (channel.isText) {
            channel.send(`Welcome, ${member.toString()}! Don't forget to claim your welcome \`*hug\`! :purple_heart:`)
        }
    },
}
