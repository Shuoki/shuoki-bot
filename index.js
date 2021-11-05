const Discord = require('discord.js')
const Dokdo = require('dokdo')
const { prefix, token } = require('./config.json')

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok'], prefix: `${prefix}` })

client.once('ready', () => {
    console.log('Ready!');
})

client.on('messageCreate', async message => {
    if (message.content === 'ping') return message.channel.send('Pong') // handle commands first
    DokdoHandler.run(message) // try !dokdo
})

client.login(token)