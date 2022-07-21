import { CategoryChannel , Client, ClientOptions, Collection, Guild, GuildMember, ActionRowBuilder, EmbedBuilder, CategoryChannelType, CategoryChildChannel, CategoryChannelChildManager, ButtonBuilder } from "discord.js";
import { GuildData, ticketDbType } from "../types";
import guildDB from "../utils/database/GuildDatabase";
import { setTicket } from "../utils/database/TicketDatabase";
import botButtons from "./BotButtons";
import BotCommand from "./BotCommand";
import BotModal from "./BotModals";
import { v4 as uuidv4 } from 'uuid'
import close from "../interactions/buttons/close";

export default class Bot extends Client {
    commands: Collection<string, BotCommand>
    modal: Collection<string, BotModal>
    button: Collection<string, botButtons>

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.modal = new Collection()
        this.button = new Collection()
    }

    async createTicket(guild: Guild, client: Bot, name: string, reason: string, member: GuildMember) {
        // console.log(await guildDB.get(`${guild.id}`) as GuildData)
        const ticket = await (await guild.channels.create({
            name: name, 
            reason: reason,
            
            parent: await ( guild.channels.cache.get(((( await guildDB.get(guild.id) as GuildData).TicketCategory) as string)) as CategoryChannel)
        }))
        // const ticket = await (await guild.channels.cache.get((((await guildDB.get(guild.id) as GuildData).TicketCategory) as string)) as CategoryChannelChildManager).createChannel(`${name}`, {
        //     type: 'GUILD_TEXT',
        //     reason: `${reason}`
        // })
        setTicket({
            channel: ticket.id,
            guildId: guild.id,
            user: member.id,
            name: name,
            reason: reason,
            ticketId: uuidv4(),
            closed: false
        })
        const embed = new EmbedBuilder()    
            .setAuthor({
                name: member.displayName,
                iconURL: member.displayAvatarURL()
            })
            .setTitle(`${name} - ${member.nickname || member.displayName}`)
            .setDescription(`${reason}`)
            .setTimestamp();
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(close.data)
        ticket.send({embeds: [embed], components: [row]})
        return ticket
    }
}