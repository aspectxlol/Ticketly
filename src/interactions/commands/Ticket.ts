import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, CategoryChannel, TextChannel, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ChatInputCommandInteraction, EmbedField } from "discord.js";
import { ChannelType } from 'discord-api-types/v10'
import Bot from "../../structures/Bot";
import BotCommand from "../../structures/BotCommand";
import TicketMenu from "../modals/TicketMenu";
import TicketButton from '../buttons/Ticket'
import { setTicketCategory } from "../../utils/database/GuildDatabase";
import ticketDB from "../../utils/database/TicketDatabase";
import { ticketDbType } from "../../types";

class Ticket extends BotCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName('ticket')
            .setDescription('ticket')
            .addSubcommand(op => op
                .setName('create')
                .setDescription('create a ticket')
            )
            .addSubcommand(op => op
                .setName('setup')
                .setDescription('setup ticketly for youre guild')
                .addChannelOption(op => op
                    .setName('category')
                    .setDescription('a category for all the tickets to go in')
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true)
                )
                .addChannelOption(op => op
                    .setName('channel')
                    .setDescription('the channel')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
            )
            .addSubcommand(op => op
                .setName('list')
                .setDescription('view all the current opened tickets')
            )
            .toJSON(),
            {requiredPermmisions: []}
        )
    }

    public async execute(interaction: ChatInputCommandInteraction < CacheType > , client: Bot) {
        const subCommand = interaction.options.getSubcommand()
        if (subCommand === 'create') {
            return interaction.showModal(TicketMenu.data)
        } else if (subCommand === 'setup') {
            setTicketCategory(interaction.guild!, (interaction.options.getChannel('category') as CategoryChannel))
            const channel = interaction.options.getChannel('channel') as TextChannel
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(TicketButton.data)
            channel.send({
                components: [row]
            })
            return interaction.reply({
                content: `Ticketly is all set!`,
                ephemeral: true
            })
        } else if (subCommand === 'list') {
            let fields: EmbedField[] = []
            const tickets: ticketDbType[] = (await ticketDB.all() as unknown as ticketDbType[])
            const ticketsEmbed = new EmbedBuilder()
                .setTitle('All Tickets')
                .setDescription('all opened tickets');

            tickets.forEach((ticket) => {
                if(ticket.value.closed) return
                const user = client.users.cache.get(ticket.value.user)
                fields.push({name: `${ticket.value.name}:`, value: `${ticket.value.reason} - ${user?.username}`, inline: true})
            })
            ticketsEmbed.setFields(fields)
            return interaction.reply({
                embeds: [ticketsEmbed]
            })
        }
        return interaction.reply('e')
    }
}

export default new Ticket()

//Type '{ name: string; value: string; inline: boolean | undefined; }' does not satisfy the constraint 'unknown[]'.