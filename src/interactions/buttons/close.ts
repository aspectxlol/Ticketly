import { ButtonInteraction, CacheType, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";
import { ticketDbType } from "../../types";
import ticketDB, { setTicket } from "../../utils/TicketDatabase";
import reopen from "./reopen";
import transcript from "./transcript";

class close extends botButtons {
    constructor() {
        super(
            'closeTicket',
            new MessageButton()
                .setCustomId('close')
                .setLabel('Close')
                .setStyle('PRIMARY')
        )
    }

    public async execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        const embed = new MessageEmbed()
            .setTitle('Ticket Closed')
            .setDescription('This Ticket is Closed');
        ticketDB.set(`${interaction.channel?.id}.closed`, true)
        const row = new MessageActionRow().addComponents(reopen.data).addComponents(transcript.data)
        interaction.channel?.send({embeds: [embed], components: [row]})
        return interaction.reply({content: 'Ticket Closed', ephemeral: true})
    }
}

export default new close()