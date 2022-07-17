import { ClientEvents } from "discord.js";
import Bot from "./Bot";

export default abstract class BotEvent<T extends EventName> {
    client: Bot 

    constructor( client: Bot) {
        this.client = client
    }

    public abstract execute(...args: ClientEvents[T]): void
}

export type EventName = keyof ClientEvents;

export type EventListener<T extends EventName> = (
    client: Bot,
    ...args: ClientEvents[T]
) => void;

export interface IBotEvent<T extends EventName> {
    eventName: T;
    once?: boolean;
    run: EventListener<T>;
}