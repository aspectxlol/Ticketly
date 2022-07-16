import { ButtonInteraction, CacheType, MessageButton } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";

class transcript extends botButtons {
    constructor() {
        super(
            'transcript',
            new MessageButton()
                .setCustomId('transcript')
                .setLabel('transcript')
                .setStyle('PRIMARY')
        )
    }

    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        interaction.channel?.messages.fetch().then((messages) => {
            messages.forEach((message) => {
                console.log(message.content)
            })
        })
        return interaction.reply('transcript')
    }
}

export default new transcript()