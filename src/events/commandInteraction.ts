import { CacheType, Interaction, MessageEmbed } from "discord.js";
import Bot from "../structures/Bot";
import BotEvent from "../structures/BotEvents";

export default class commandInteraction extends BotEvent<'interactionCreate'> {
    constructor(client: Bot) {
        super(client)

    }

    public execute(interaction: Interaction<CacheType>): void {
        if(!interaction.isCommand()) return
        const command = this.client.commands.get(interaction.commandName.toString())

        if(!command) return

        try {
            command?.execute(interaction, this.client);
        } catch (e) {
            if(e instanceof Error) {
                const embed = new MessageEmbed()
                    .setTitle(`${e.name}`)
                    .setDescription(e.message)

                interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
    
}

