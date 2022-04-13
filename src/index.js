const { Client, Intents, Collection } = require('discord.js');
const { bot_token } = require('./data/index');
const fs = require('node:fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,   //Estos es lo que permite al bot interactuar en los servidores.
        Intents.FLAGS.GUILD_PRESENCES,
    ]
});

module.exports = client;//Aqui exporto la variable client
                        //para poder usarla en otros archivos.

//Las colecciones se las usa para guardar la informacion
//de los comandos como tipo de archivo .json
client.commands = new Collection();
client.events = new Collection();
client.categories = fs.readdirSync("./src/commands/");

//Esto ejecutara los eventos del bot
['events', 'commands'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(bot_token);