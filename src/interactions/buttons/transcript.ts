import { ButtonInteraction, CacheType, ButtonBuilder, ButtonStyle, AttachmentBuilder } from "discord.js";
import moment from "moment";
import Bot from "../../structures/Bot";
import botButtons from "../../structures/BotButtons";
import ticketDB from "../../utils/database/TicketDatabase"
import { strign2bin } from "../../utils/utils";

class transcript extends botButtons {
    constructor() {
        super(
            'transcript',
            new ButtonBuilder()
                .setCustomId('transcript')
                .setLabel('transcript')
                .setStyle(ButtonStyle.Success)
        )
    }

    public async execute(interaction: ButtonInteraction<CacheType>, client: Bot) {
        let data: string[] = [];
        let bin: number[] = [];
        const Ticket = await ticketDB.get(`${interaction.channel?.id!}.ticketId`)
        const messages = await interaction.channel?.messages.fetch()
        messages?.forEach((message) => {
            data.push(`[${moment(message.createdTimestamp).format('h:mm a')}] ${message.author.tag}: ${message.content}\n`)
        })

        data.forEach((m) => {
            strign2bin(m).forEach((b) => {
                bin.push(b)
            })
        })

        // await interaction.user.send({files: [{attachment: Buffer.from(bin), name: `transcript-${Ticket}.txt`}]})
        //new AttachmentBuilder(Buffer.from(bin), {name: `Ticket-Transcript.txt`})
        await interaction.user.send({files: [new AttachmentBuilder(Buffer.from(bin), {name: `Ticket-Transcript.txt`})]})
        return interaction.reply({content: `the transcript is sent to your dms`, ephemeral: true})
    }
}

export default new transcript()