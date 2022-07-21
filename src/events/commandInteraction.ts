import { CacheType, ChatInputCommandInteraction, Interaction, EmbedBuilder, InteractionType } from "discord.js";
import Bot from "../structures/Bot";
import BotEvent from "../structures/BotEvents";

export default class commandInteraction extends BotEvent<'interactionCreate'> {
    constructor(client: Bot) {
        super(client)
    }

    public async execute(interaction: Interaction<CacheType>) {
        if(!(interaction.type === InteractionType.ApplicationCommand)) return
        const int = interaction as ChatInputCommandInteraction<CacheType>
        const command = this.client.commands.get(int.commandName.toString())

        if(!command) return
        if(command.options.requiredPermmisions) {
            // int.member?.permissions
        }
        try {
            command?.execute(int, this.client);
        } catch (e) {
            if(e instanceof Error) {
                const embed = new EmbedBuilder()
                    .setTitle(`${e.name}`)
                    .setDescription(e.message)

                int.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
    
}

