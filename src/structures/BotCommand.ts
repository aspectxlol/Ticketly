import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'
import { ChatInputCommandInteraction, PermissionResolvable } from 'discord.js'
import Bot from './Bot'

interface commandOptions {
    requiredPermmisions: PermissionResolvable
}

export default abstract class BotCommand {
    data: RESTPostAPIApplicationCommandsJSONBody
    options: commandOptions

    constructor(data: RESTPostAPIApplicationCommandsJSONBody, opt: commandOptions) {
        this.data = data
        this.options = opt
    }

    public abstract execute(interaction: ChatInputCommandInteraction, client: Bot): any

}