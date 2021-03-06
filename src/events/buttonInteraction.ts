import { Interaction, CacheType, EmbedBuilder } from "discord.js";
import Bot from "../structures/Bot";
import BotEvent from "../structures/BotEvents";

export default class buttonInteraction extends BotEvent<"interactionCreate"> {
    constructor(client: Bot) {
        super(client)
    }

    public async execute(interaction: Interaction<CacheType>) {
        if(!interaction.isButton()) return 
        const button = this.client.button.get(interaction.customId)
        if(!button) return

        try {
            await button.execute(interaction, this.client)
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