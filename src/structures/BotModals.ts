import { Modal, ModalSubmitInteraction } from "discord.js"
import Bot from "./Bot"

export default abstract class BotModal {
    data: Modal
    name: string
    constructor(name: string, data: Modal) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ModalSubmitInteraction, client: Bot): any
}
