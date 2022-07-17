import { ButtonInteraction, MessageButton } from "discord.js";
import Bot from "./Bot";

export default abstract class BotButtons {
    data: MessageButton
    name: string

    constructor(name: string, data: MessageButton) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ButtonInteraction, client: Bot): any
}