const {Client, Intents, Collection} = require('discord.js')
const Dokdo = require('dokdo')
const fs = require('fs')
const { prefix, token } = require('./config.json')

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    disableMention: 'everyone'
})
const DokdoHandler = new Dokdo(client, {
    aliases: ['dokdo', 'dok'],
    prefix: `${prefix}`
})

client.once('ready', () => {
    console.log(`Shuoki#0912 запустилась на ${client.guilds.cache.size} серверах`)
    client.user.setActivity(`League of legends`, {type: 0})
})

client.on('messageCreate', async message => {
    DokdoHandler.run(message)
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./command/${file}`);
    console.log(`${file} был загружен`)
    client.commands.set(command.name, command);
}

client.login(token)