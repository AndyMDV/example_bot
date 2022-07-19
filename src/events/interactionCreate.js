const { client } = require("..");

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        command.run(client, interaction)
    } catch (e) {
        console.log(e);
    }
});