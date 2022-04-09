import { MessageActionRow, MessageButton } from 'discord.js'

/**
 * Creates a Tic Tac Toe object and controls the interactions afterwards
 */

export class TicTacToe {
    private buttons: MessageButton[]
    private rows: MessageActionRow[]

    constructor(authorId: string) {
        this.createButtons(authorId)
        this.createRows()
    }

    /**
     * Creates the buttons
     */
    private createButtons(id: string): void {
        const btn11 = new MessageButton().setCustomId(`ttc11_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn12 = new MessageButton().setCustomId(`ttc12_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn13 = new MessageButton().setCustomId(`ttc13_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn21 = new MessageButton().setCustomId(`ttc21_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn22 = new MessageButton().setCustomId(`ttc22_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn23 = new MessageButton().setCustomId(`ttc23_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn31 = new MessageButton().setCustomId(`ttc31_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn32 = new MessageButton().setCustomId(`ttc32_${id}`).setLabel(' ').setStyle('SECONDARY')
        const btn33 = new MessageButton().setCustomId(`ttc33_${id}`).setLabel(' ').setStyle('SECONDARY')
        this.buttons = [btn11, btn12, btn13, btn21, btn22, btn23, btn31, btn32, btn33]
    }

    /**
     *
     * Creates the rows/board
     */
    private createRows(): void {
        const row1 = new MessageActionRow().addComponents([this.buttons[0], this.buttons[1], this.buttons[2]])
        const row2 = new MessageActionRow().addComponents([this.buttons[3], this.buttons[4], this.buttons[5]])
        const row3 = new MessageActionRow().addComponents([this.buttons[6], this.buttons[7], this.buttons[8]])
        this.rows = [row1, row2, row3]
    }

    /**
     *
     * @returns the board
     */
    public getBoard() {
        return this.rows
    }
}
