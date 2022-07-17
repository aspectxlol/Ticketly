import { ButtonInteraction, CacheType, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import Bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/TicketDatabase";
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

    public async execute(interaction: ButtonInteraction<CacheType>, client: Bot) {
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