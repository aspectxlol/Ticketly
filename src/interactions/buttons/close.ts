import { ButtonInteraction, CacheType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, APIActionRowComponent, APIMessageActionRowComponent } from "discord.js";
import Bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/database/TicketDatabase";
import reopen from "./reopen";
import transcript from "./transcript";

class close extends botButtons {
    constructor() {
        super(
            'closeTicket',
            new ButtonBuilder()
                .setCustomId('close')
                .setLabel('Close')
                .setStyle(ButtonStyle.Primary)
        )
    }

    public async execute(interaction: ButtonInteraction<CacheType>, client: Bot) {
        if(await ticketDB.get(`${interaction.channel?.id}.closed`)) return interaction.reply({content: `Ticket is already closed`, ephemeral: true})
        const embed = new EmbedBuilder()
            .setTitle('Ticket Closed')
            .setDescription('This Ticket is Closed');
        ticketDB.set(`${interaction.channel?.id}.closed`, true)
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(reopen.data).addComponents(transcript.data).toJSON()
        interaction.channel?.send({embeds: [embed], components: [row]})
        return interaction.reply({content: 'Ticket Closed', ephemeral: true})
    }
}

export default new close()