import { CategoryChannel, Guild } from "discord.js";
import { QuickDB } from "quick.db";

const guildDB = new QuickDB({filePath: 'src/database/guild.sqlite'})

export default guildDB

export const setTicketCategory = async (guild: Guild, category: CategoryChannel) => {
    guildDB.set(`${guild.id}`, { TicketCategory: category.id })
}