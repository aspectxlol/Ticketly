import { ButtonInteraction, CacheType, ButtonBuilder, ButtonStyle } from "discord.js";
import bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import TicketMenu from "../modals/TicketMenu";

class TicketButton extends botButtons {
    constructor() {
        super(
            'Ticket',
            new ButtonBuilder()
                .setCustomId('ticket')
                .setLabel('Create Ticket')
                .setStyle(ButtonStyle.Success)
        )
    }

    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        interaction.showModal(TicketMenu.data)
    }
}

export default new TicketButton()