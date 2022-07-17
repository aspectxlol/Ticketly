import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'
import { CommandInteraction } from 'discord.js'
import Bot from './Bot'

export default abstract class BotCommand {
    data: RESTPostAPIApplicationCommandsJSONBody
    
    constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
        this.data = data
    }

    public abstract execute(interaction: CommandInteraction, client: Bot): any

}