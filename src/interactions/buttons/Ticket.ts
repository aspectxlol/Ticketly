import { ButtonInteraction, CacheType, Emoji, MessageButton } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";
import TicketMenu from "../modals/TicketMenu";

class TicketButton extends botButtons {
    constructor() {
        super(
            'Ticket',
            new MessageButton()
                .setCustomId('ticket')
                .setLabel('Create Ticket')
                .setStyle('SUCCESS')
        )
    }

    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        interaction.showModal(TicketMenu.data)
    }
}

export default new TicketButton()