import { Collection, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js'
import db from '../../utils/database/database.js'

/**
 * Object for the setup command/event. Saves all data in order to make all queries at the end of the setup.
 */
export class Setup {
    private settings: Collection<string, string> = new Collection()
    private btnReady: MessageButton = new MessageButton()
    private btnHelp: MessageButton = new MessageButton()
    private btnYes: MessageButton = new MessageButton()
    private btnNo: MessageButton = new MessageButton()
    private questions: Array<string>

    public constructor() {
        this.btnReady.setStyle('SUCCESS').setCustomId(`readySetup`).setLabel(`Ready!`)
        this.btnHelp.setStyle('SECONDARY').setCustomId(`helpSetup`).setLabel(`Help!`)
        this.btnYes.setStyle('SUCCESS').setCustomId(`yesSetup`).setLabel(`Yes!`)
        this.btnNo.setStyle('DANGER').setCustomId(`noSetup`).setLabel(`No!`)
        this.setKeys()
    }

    private setKeys(): void {
        this.setQuestions()
        for (let i = 0; i < this.questions.length; i++) {
            this.settings.set(this.questions[i], '')
        }
    }

    private setQuestions(): void {
        this.questions = ['What prefix do you prefer?', 'Do you want me to create a moderation channel for logging different events?']
    }

    private getReady(): MessageButton {
        return this.btnReady
    }

    private getHelp(): MessageButton {
        return this.btnHelp
    }

    private getYes(): MessageButton {
        return this.btnYes
    }
    private getNo(): MessageButton {
        return this.btnNo
    }

    private selectMenu(): MessageSelectMenu {
        return new MessageSelectMenu()
            .setCustomId('prefixSetup')
            .setPlaceholder('Select a prefix')
            .addOptions([
                {
                    label: '*',
                    description: 'asterisk (Default prefix)',
                    value: '*',
                },
                {
                    label: '.',
                    description: 'dot',
                    value: '.',
                },
                {
                    label: '&',
                    description: 'ampersand',
                    value: '&',
                },
                {
                    label: '$',
                    description: 'dollar',
                    value: '$',
                },
                {
                    label: '#',
                    description: 'hashtag/number sign',
                    value: '#',
                },
                {
                    label: '%',
                    description: 'percent',
                    value: '%',
                },
                {
                    label: '^',
                    description: 'caret/roof',
                    value: '^',
                },
                {
                    label: '<',
                    description: 'less than',
                    value: '<',
                },
                {
                    label: '>',
                    description: 'greater than',
                    value: '>',
                },
                {
                    label: '=',
                    description: 'equals',
                    value: '=',
                },
                {
                    label: '!',
                    description: 'exclamation mark',
                    value: '!',
                },
                {
                    label: '?',
                    description: 'question mark',
                    value: '?',
                },
                {
                    label: '-',
                    description: 'dash/minus',
                    value: '-',
                },
                {
                    label: '~',
                    description: 'tilde',
                    value: '~',
                },
                {
                    label: '_',
                    description: 'underscore/understrike',
                    value: '_',
                },
                {
                    label: '/',
                    description: 'slash',
                    value: '/',
                },
            ])
    }

    public getSelectMenu(): MessageActionRow {
        return new MessageActionRow().addComponents(this.selectMenu())
    }

    public getDefaultRow(): MessageActionRow {
        return new MessageActionRow().addComponents(this.getReady(), this.getHelp())
    }

    public getYesNo(): MessageActionRow {
        return new MessageActionRow().addComponents(this.getYes(), this.getNo())
    }

    //TODO check in with quiz (counter = 0)
    public async initDatabase(guildId: string): Promise<void> {
        await db.getClient().then(async (client) => {
            let text = `CREATE SCHEMA IF NOT EXISTS guild_${guildId}`
            await client
                .query({
                    text: text,
                })
                .then(async () => {
                    text = `CREATE TABLE IF NOT EXISTS guild_${guildId}.quiz (
    counter varchar, 
    question text, 
    options text, 
    answers text
);`
                    await client.query({
                        text: text,
                    })
                })
                .then(async () => {
                    text = `CREATE TABLE IF NOT EXISTS guild_${guildId}.quiz_users(
user_id varchar
);`
                    await client.query({
                        text: text,
                    })
                    text = `CREATE TABLE IF NOT EXISTS guild_${guildId}.settings (
prefix varchar,
notif_channel text
);`
                    await client.query({
                        text: text,
                    })
                })
                .then(async () => {
                    text = `INSERT INTO guild_${guildId}.settings(prefix, notif_channel)
values ('*', 'no');`
                    await client.query({
                        text: text,
                    })
                })
            client.release()
        })
    }

    public getPrefix(): MessageActionRow {
        const btnDefault = new MessageButton().setStyle('PRIMARY').setCustomId(`defaultPrefixSetup`).setLabel(`*`)
        const btnPoint = new MessageButton().setStyle('PRIMARY').setCustomId(`pointPrefixSetup`).setLabel(`.`)
        const btnAmpersand = new MessageButton().setStyle('PRIMARY').setCustomId(`ampersandPrefixSetup`).setLabel(`&`)
        const btnDollar = new MessageButton().setStyle('PRIMARY').setCustomId(`dollarPrefixSetup`).setLabel(`$`)
        const btnSmaller = new MessageButton().setStyle('PRIMARY').setCustomId(`smallerPrefixSetup`).setLabel(`<`)
        return new MessageActionRow().addComponents(btnDefault, btnPoint, btnAmpersand, btnDollar, btnSmaller)
    }
}
