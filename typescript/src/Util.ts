import { Guild, GuildMember, Client, Permissions } from 'discord.js'

/**
 * Creates an object with ID's
 * @constructor `(memberId: string, guildId: string, client: Client)`
 * @function `setGuild`
 * @function `setMember`
 * @function `setClient`
 * @function `getGuild` {Guild}
 * @function `getMember` {GuildMember}
 * @function `getMemberById` {GuildMember}
 * @function `isAdmin` {boolean}
 * @function `fetchMembers` {string[]}
 * @function `toString`
 */

export class Util {
    private memberId: string
    private guildId: string
    private client: Client

    /**
     *
     * @param memberId {string}
     * @param guildId {string}
     * @param client {Client}
     */
    constructor(memberId: string, guildId: string, client: Client) {
        this.memberId = memberId
        this.guildId = guildId
        this.client = client
    }

    /**
     * Setter for the ID of the guild
     * @param guildId ID of the guild
     */
    setGuild(guildId: string) {
        this.guildId = guildId
    }

    /**
     * Setter for the ID of the guild
     * @param memberId ID of the member, that sent the message
     */
    setMember(memberId: string) {
        this.memberId = memberId
    }

    /**
     * Setter for the client
     * @param client Client
     */
    setClient(client: Client) {
        this.client = client
    }

    /**
     *
     * @returns Client
     */
    getClient(): Client {
        return this.client
    }

    /**
     *
     * Returns the Guild
     *
     * @function guild
     * @returns {Guild} Guild
     *
     */
    getGuild(): Guild {
        return this.client.guilds.cache.get(this.guildId)
    }

    /**
     * @returns The ID of the guild
     */
    getGuildId(): string {
        return this.guildId
    }

    /**
     *
     * Fetches a member from a guild.
     *
     * @function member
     * @returns {undefined | GuildMember} the fetched member or `undefined` if the ID is invalid or if no such user is found in the guild
     *
     */
    getMember(): GuildMember | undefined {
        const guild = this.getGuild()
        const member = guild.members.cache.get(this.memberId)
        return member ? member : undefined
    }

    /**
     *
     * @returns The ID of the member
     */
    getMemberId(): string {
        return this.memberId
    }

    /**
     * Get a member by its ID; should be different than the command author
     * @param {string} id Input ID for the member
     * @returns {GuildMember} Returns a member, that is different than the one, that called the command. Both should be in the same guild
     */
    getMemberById(id: string): undefined | GuildMember {
        const guild = this.getGuild()
        const member = guild.members.cache.get(id)
        return member ? member : undefined
    }

    /**
     *
     * Checks if a member is an admin.
     *
     * @function isAdmin
     * @param {String} id The ID of the member, that sent the message; needed to be parsed to member().
     * @returns {boolean} `true` if the member is an admin.
     *
     */
    isAdmin(): boolean {
        const member = this.getMember()
        return member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) ? true : false
    }

    /**
     *
     * Fetches the ID's of all members in a guild.
     *
     * @function `fetchMembers`
     * @property {string[]} `listOfUsers` String array with the user ID's.
     * @returns {string[]} `listOfUsers`
     *
     */
    fetchMembers(): string[] {
        //initialize guild
        const guild = this.getGuild()

        let totalUsers = 0
        let listOfUsers = []
        guild.members.cache.forEach((member) => {
            totalUsers++
            listOfUsers.push(member.id.toString())
        })

        console.log(`Total fetched users: ${totalUsers}`)
        return listOfUsers
    }

    /**
     *
     * @returns Logs the objects as a string
     */
    toString(): void {
        console.log(`memberId: ${this.memberId}\nguildId: ${this.guildId}`)
    }

    /**
     *
     * @returns The ID of the owner of the guild
     */
    fetchOwner(): string {
        return this.getGuild().ownerId
    }

    /**
     *
     * @returns True if the message author is the owner of the guild
     */
    isOwner(): boolean {
        return this.memberId == this.fetchOwner() ? true : false
    }
}
