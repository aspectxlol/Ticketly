import { Channel, Snowflake, TextChannel } from "discord.js";

interface ticket {
    guildId: Snowflake
    channel: Snowflake
    user: Snowflake
    name: string
    reason: string
    ticketId: string
    closed: boolean
}

interface GuildData {
    TicketCategory: string
}

interface ticketDbType {
    id: string,
    value: ticket
}

// interface GuildDBType 
