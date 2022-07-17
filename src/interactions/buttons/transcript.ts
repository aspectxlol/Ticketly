import { ButtonInteraction, CacheType, MessageButton } from "discord.js";
import Bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/TicketDatabase";
import { strign2bin } from "../../utils/utils";

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

    public async execute(interaction: ButtonInteraction<CacheType>, client: Bot) {
        let data: string[] = [];
        let bin: number[] = [];
        const Ticket = await ticketDB.get(`${interaction.channel?.id!}.ticketId`)
        const messages = await interaction.channel?.messages.fetch()
        messages?.forEach((message) => {
            data.push(`[${message.createdAt.toUTCString()}] ${message.author.tag}: ${message.content}\n`)
        })

        data.forEach((m) => {
            strign2bin(m).forEach((b) => {
                bin.push(b)
            })
        })

        return interaction.reply({files: [{attachment: Buffer.from(bin), name: `transcript-${Ticket}.txt`}]})  
    }
}

export default new transcript()