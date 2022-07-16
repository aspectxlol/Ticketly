import { CacheType, GuildMember, MessageActionRow, MessageEmbed, Modal, ModalActionRowComponent, ModalSubmitInteraction, TextInputComponent } from "discord.js";
import bot from "../../structures/bot";
import BotModal from "../../structures/BotModals";
import guildDB from "../../utils/GuildDatabase";
import { setTicket } from "../../utils/TicketDatabase";

const nameInput = new TextInputComponent()
    .setLabel('Name')
    .setStyle('PARAGRAPH')
    .setCustomId('name')
    .setPlaceholder('a name for your ticket')
    .setRequired(true);

const reasonInput = new TextInputComponent()
    .setLabel('Reason')
    .setStyle('PARAGRAPH')
    .setCustomId('reason')
    .setPlaceholder('a reason why you created your ticket')
    .setRequired(true);

const nameInputRow = new MessageActionRow<ModalActionRowComponent>().addComponents(nameInput)
const reasonInputRow = new MessageActionRow<ModalActionRowComponent>().addComponents(reasonInput)

class TicketModal extends BotModal {
    constructor() {
        super(
            'ticket',
            new Modal()
                .setCustomId('ticketmenu')
                .setTitle('Ticket')
                .addComponents(nameInputRow)
                .addComponents(reasonInputRow)
                
        );
    }

    public async execute(interaction: ModalSubmitInteraction<CacheType>, client: bot) {
        const channel = await client.createTicket(interaction.guild!, client,interaction.fields.getTextInputValue('name'), interaction.fields.getTextInputValue('reason'), (interaction.member as GuildMember))
        const embed = new MessageEmbed()
            .setTitle('Ticket Created')
            .setDescription(`Ticket <#${channel.id}> is created`)
        return interaction.reply({embeds: [embed], ephemeral: true})
    }
}

export default new TicketModal()