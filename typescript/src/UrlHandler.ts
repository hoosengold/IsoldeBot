import { Message } from 'discord.js'

/**
 * Creates an object that checks for URL's
 * @constructor `(message: Message)`
 */
export class UrlHandler {
    private message: Message
    private url: URL
    private readonly inviteMatcher = new RegExp(
        /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?((?:discord(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*gg(\ )*)(\/)*(\ )*)|(discordapp(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*com)/gim
    )
    private readonly mainMatcher = new RegExp(
        /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?/gim
    )
    private readonly alphanumericMatcher = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?/gim)
    private readonly iPv4Matcher = new RegExp(
        /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))/gim
    )
    private readonly iPv6Matcher = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(([\da-fA-F]{4}:){1,7}[\da-fA-F]{4})/gim)

    /**
     *
     * @param {Message} message
     */
    public constructor(message: Message) {
        this.message = message
    }

    /**
     *
     * @returns {RegExpMatchArray}
     */
    public checkInvite(): RegExpMatchArray {
        return this.message.content.match(this.inviteMatcher)
    }

    /**
     *
     * @returns {Promise<boolean>}
     */
    public async checkShortenedUrl(): Promise<boolean> {
        return this.message.content.includes(
            'bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link'
        )
            ? true
            : false
    }

    /**
     *
     * @returns {Promise<RegExpMatchArray[]>}
     */
    public async checkUrl(): Promise<RegExpMatchArray[]> {
        return [
            this.message.content.match(this.mainMatcher),
            this.message.content.match(this.iPv4Matcher),
            this.message.content.match(this.iPv6Matcher),
            this.message.content.match(this.alphanumericMatcher),
        ]
    }
}
