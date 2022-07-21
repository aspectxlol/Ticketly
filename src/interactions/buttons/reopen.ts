import { ButtonInteraction, CacheType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from "discord.js";
import bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/database/TicketDatabase";
import close from "./close";

class reopen extends botButtons {
    constructor() {
        super(
            'reopen Ticket',
            new ButtonBuilder()
                .setCustomId('reopen')
                .setLabel('Reopen Ticket')
                .setStyle(ButtonStyle.Primary)
        )
    }

    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        const embed = new EmbedBuilder()
            .setTitle('Ticket Reopened')
            .setDescription('this ticket was reopened')
        ticketDB.set(`${interaction.channel?.id}.closed`, false)
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(close.data)
        interaction.channel?.send({embeds: [embed], components: [row]})
        return interaction.reply({content: 'Ticket reopened', ephemeral: true})
    }
}

export default new reopen()