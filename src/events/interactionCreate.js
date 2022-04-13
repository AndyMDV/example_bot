const client = require("..");

client.on('interactionCreate', async interaction => {
    //await interaction.deferReply({ ephemeral: true }).catch((e) => { console.log(e) });
    //deferReply es para que los mensajes sean privados, no lo necesitas activar por ahora.
    const color = interaction.guild.me.displayHexColor === "#000000" ? "#ffffff" : interaction.guild.me.displayHexColor;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    try {
        cmd.run(client, interaction);//Aqui corren los comandos
    } catch (e) {
        console.error(e);//Manda un error en la consola en caso de que algo pase
        return interaction.reply({
            embeds: [
                {
                    description: 'Sorry, try to run the command again.',
                    color: color,
                }
            ]
        })
    }
})