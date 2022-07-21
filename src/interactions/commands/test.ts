// import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import Bot from "../../structures/Bot";
import BotCommand from "../../structures/BotCommand";

class test extends BotCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('test')
                .setDescription('a test command')
                .toJSON(),
            {requiredPermmisions: []}
        ) 
    }

    public execute(interaction: CommandInteraction<CacheType>, client: Bot) {
        console.log(interaction.member?.permissions)
        return interaction.reply('e')
    }
}

export default new test()