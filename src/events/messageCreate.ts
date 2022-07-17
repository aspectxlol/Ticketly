import { Message } from "discord.js";
import Bot from "../structures/Bot";
import BotEvent from "../structures/BotEvents";

export default class messageCreate extends BotEvent<"messageCreate"> {
    constructor(client: Bot) {
        super(client)
    }

    public execute(message: Message<boolean>): void {
        return;
    }
}