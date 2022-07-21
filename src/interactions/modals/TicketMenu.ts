import { CacheType, GuildMember, EmbedBuilder, ModalActionRowComponentBuilder, ModalActionRowComponent, ModalSubmitInteraction, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalBuilder } from "discord.js";
import Bot from "../../structures/Bot";
import BotModal from "../../structures/BotModals";
import guildDB from "../../utils/database/GuildDatabase";
import ticketDB from "../../utils/database/TicketDatabase";

const nameInput = new TextInputBuilder()
    .setLabel('Name')
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId('name')
    .setPlaceholder('a name for your ticket')
    .setRequired(true);

const reasonInput = new TextInputBuilder()
    .setLabel('Reason')
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId('reason')
    .setPlaceholder('a reason why you created your ticket')
    .setRequired(true);

const nameInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput)
const reasonInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reasonInput)

class TicketModal extends BotModal {
    constructor() {
        super(
            'ticket',
            new ModalBuilder()
                .setCustomId('ticketmenu')
                .setTitle('Ticket')
                .addComponents(nameInputRow)
                .addComponents(reasonInputRow)
                
        );
    }

    public async execute(interaction: ModalSubmitInteraction<CacheType>, client: Bot) {
        if(!(await guildDB.get(interaction.guild?.id!))) return interaction.reply({content: 'Ticketly is not setup please do `/ticket setup`', ephemeral: true})
        const channel = await client.createTicket(interaction.guild!, client,interaction.fields.getTextInputValue('name'), interaction.fields.getTextInputValue('reason'), (interaction.member as GuildMember))
        const embed = new EmbedBuilder()
            .setTitle('Ticket Created')
            .setDescription(`Ticket <#${channel.id}> is created`)
        return interaction.reply({embeds: [embed], ephemeral: true})
    }
}

export default new TicketModal()