import { ButtonInteraction, ButtonBuilder } from "discord.js";
import Bot from "./Bot";

export default abstract class BotButtons {
    data: ButtonBuilder
    name: string

    constructor(name: string, data: ButtonBuilder) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ButtonInteraction, client: Bot): any
}