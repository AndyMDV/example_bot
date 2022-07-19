const { Client, Intents, Collection } = require('discord.js');
const data = require('./data/index');
const fs = require('node:fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
    ]
});

const commands = new Collection();
const events = new Collection();
const categories = fs.readdirSync("./src/commands/");

module.exports = { client, commands, events, categories }

['events', 'commands'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(data.bot_token);