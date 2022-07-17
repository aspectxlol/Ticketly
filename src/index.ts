import { Intents } from 'discord.js'
import Bot from './structures/Bot'
import { config } from 'dotenv'
config()

import Ready from './events/Ready'
import commandInteraction from './events/commandInteraction'
import messageCreate from './events/messageCreate'
import modalInteraction from './events/modalInteraction'
import buttonInteraction from './events/buttonInteraction'

const client = new Bot({
    intents: new Intents(32767)
}) 

client.on('interactionCreate', (interaction) => { new commandInteraction(client).execute(interaction) })
client.on('interactionCreate', (interaction) => { new modalInteraction(client).execute(interaction) })

client.on('ready', () => { new Ready(client).execute() } )
client.on('interactionCreate', (interaction) => { new buttonInteraction(client).execute(interaction) })
client.on('messageCreate', (message) => { new messageCreate(client).execute(message) })

client.login(process.env.TOKEN)