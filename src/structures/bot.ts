import { CategoryChannel, Channel, Client, ClientOptions, Collection, Guild, GuildMember, MessageActionRow, MessageEmbed, TextChannel } from "discord.js";
import { GuildData } from "../types";
import guildDB from "../utils/GuildDatabase";
import { setTicket } from "../utils/TicketDatabase";
import botButtons from "./BotButtons";
import BotCommand from "./BotCommand";
import BotModal from "./BotModals";
import { v4 as uuidv4 } from 'uuid'
import close from "../interactions/buttons/close";

export default class AspectxBot extends Client {
    commands: Collection<string, BotCommand>
    modal: Collection<string, BotModal>
    button: Collection<string, botButtons>

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.modal = new Collection()
        this.button = new Collection()
    }

    async createTicket(guild: Guild, client: AspectxBot, name: string, reason: string, member: GuildMember) {
        const ticket = await (await guild.channels.cache.get((((await guildDB.get(guild.id) as GuildData).TicketCategory) as string)) as CategoryChannel).createChannel(`${name}`, {
            type: 'GUILD_TEXT',
            reason: `${reason}`
        })
        setTicket({
            channel: ticket.id,
            guildId: guild.id,
            user: member.id,
            name: name,
            reason: reason,
            ticketId: uuidv4(),
            closed: false
        })
        const embed = new MessageEmbed()    
            .setAuthor({
                name: member.displayName,
                iconURL: member.displayAvatarURL()
            })
            .setTitle(`${name} - ${member.nickname || member.displayName}`)
            .setDescription(`${reason}`)
            .setTimestamp();
        const row = new MessageActionRow()
            .addComponents(close.data)
        ticket.send({embeds: [embed], components: [row]})
        return ticket
    }
}