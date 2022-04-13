const { CommandInteraction, Client } = require("discord.js");
const { stripIndents } = require("common-tags/lib");

module.exports = {
    name: 'help',
    description: 'Bot give you a info message',
    category: 'Others',
    options: [
        {
            name: 'info',
            description: 'You get information on how to use the bot',
            type: 2,
            options: [
                {
                    name: 'command_info',
                    description: 'Info about command',
                    type: 1,
                    options: [
                        {
                            name: 'command',
                            description: 'Name command',
                            type: 3,
                            required: true,
                        },
                    ],
                },
                {
                    name: 'bot_info',
                    description: 'Info about bot',
                    type: 1,
                },
                {
                    name: 'command_list',
                    description: 'The bot returns a list of all commands.',
                    type: 1
                }
            ]
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const color = interaction.guild.me.displayHexColor === "#000000" ? "#ffffff" : interaction.guild.me.displayHexColor;
            if (interaction.options.getSubcommand() === 'command_info') {
                const command_get = client.commands.get(interaction.options.getString('command'));

                if (!command_get) return interaction.reply({
                    embeds: [
                        {
                            description: `My developer didn't add the command you mentioned. please try again.`,
                            color: color,
                            footer: { text: `Request by: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() },
                        }
                    ]
                })

                const command_options = command_get.options ? command_get.options.map((opt, i) => `**${i + 1}** - \`${opt.name}\` | \`${opt.description}\``).join('\n') : 'This command has no options';
                return interaction.reply({
                    embeds: [
                        {
                            title: 'Command Info',
                            description: `Comand name: **/${command_get.name}**\nDescription: \`${command_get.description ? command_get.description : 'This command has no description'}\`\n\n**Options**\n ${command_options}`,
                            footer: { text: `Request by: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() },
                            color: color,
                        }
                    ]
                });
            } else if (interaction.options.getSubcommand() === 'bot_info') {

            } else if (interaction.options.getSubcommand() === 'command_list') {
                const commands = (category) => {
                    return client.commands
                        .filter(cmd => cmd.category === category)
                        .map(cmd => `\`/${cmd.name}\``)
                        .join(',  ');
                }

                const info = client.categories
                    .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
                    .reduce((string, category) => `${string}\n${category}`);
                return interaction.reply({
                    embeds: [
                        {
                            title: ' 🔰 COMMANDS LIST 🔰 ',
                            description: `Type \`/help info command_info <command>\` to see more information about commands.\n${info}`,
                            footer: {
                                text: `Request by: ${interaction.user.username}`,
                                iconURL: interaction.user.avatarURL(),
                            },
                            color: color
                        }
                    ]
                })
            }
        } catch (e) {
            return interaction.reply({
                embeds: [
                    {
                        description: e,
                        color: color
                    }
                ]
            })
        }
    }
}