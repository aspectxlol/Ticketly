import { Interaction, CacheType, EmbedBuilder, InteractionType, ModalSubmitInteraction } from "discord.js";
import Bot from "../structures/Bot";
import BotEvent from "../structures/BotEvents";

export default class modalInteraction extends BotEvent<"interactionCreate"> {
    constructor(client: Bot) {
        super(client)
    }

    public async execute(interaction: Interaction<CacheType>) {
        if(!(interaction.type === InteractionType.ModalSubmit)) return 
        const int = interaction as ModalSubmitInteraction
        const modal = this.client.modal.get(interaction.customId)
        if(!modal) return

        try {
            await modal.execute(interaction, this.client)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error)
                const embed = new EmbedBuilder()
                    .setTitle(`${error.name}`)
                    .setDescription(error.message)

                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
}