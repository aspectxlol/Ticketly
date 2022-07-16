import { ButtonInteraction, CacheType, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/TicketDatabase";
import close from "./close";

class reopen extends botButtons {
    constructor() {
        super(
            'reopen Ticket',
            new MessageButton()
                .setCustomId('reopen')
                .setLabel('Reopen Ticket')
                .setStyle('SECONDARY')
        )
    }

    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        const embed = new MessageEmbed()
            .setTitle('Ticket Reopened')
            .setDescription('this ticket was reopened')
        ticketDB.set(`${interaction.channel?.id}.closed`, false)
        const row = new MessageActionRow().addComponents(close.data)
        interaction.channel?.send({embeds: [embed], components: [row]})
        return interaction.reply({content: 'Ticket reopened', ephemeral: true})
    }
}

export default new reopen()