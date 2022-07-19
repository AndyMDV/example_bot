const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client } = require('discord.js');
const { readdirSync } = require('node:fs');
const {
    bot_token,
    commandsInteraction,
    bot_id,
    guild_id
} = require('../data/index');

const { commands } = require('..')

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    const array_commands = [];
    readdirSync('./src/commands/').forEach(dir => {
        const command_files = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of command_files) {
            const command = require(`../commands/${dir}/${file}`);
            if (command.name) {
                commands.set(command.name, command)
                array_commands.push(command);
            } else {
                continue;
            }
        }
    });

    const rest = new REST({ version: '9' }).setToken(bot_token);

    if (commandsInteraction) {
        (async () => {
            console.log('Started refreshing global application (/) commands.');
            rest.put(
                Routes.applicationCommands(client_id), {
                body: array_commands,
            }
            ).then(() => console.log('Successfully reloaded global application (/) commands.')).catch(e => {
                console.log(`Hubo un error en la publicacion global de los comandos\nError: ${e}`);
            });
        })();
    } else {
        (async () => {
            console.log('Started refreshing private guild application (/) commands.');
            rest.put(
                Routes.applicationGuildCommands(bot_id, guild_id), {
                body: array_commands,
            }
            ).then(() => console.log('Successfully reloaded private guild application (/) commands.')).catch(e => {
                console.log(`Hubo un error en la publicacion privada de los comandos\nError: ${e}`);
            });
        })();
    }
}
