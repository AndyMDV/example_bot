const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Comando de testeo',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        interaction.channel.send(`Test command works`)
    }
}