const client = require('..');

client.on('messageCreate', async message => {
    const color = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();

    let prefix = "cb!"
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) {
        if (matchedPrefix.includes(client.user.id)) return message.reply({
            embeds: [
                {
                    title: `Hugh? I got pinged? Imma give you some help`,
                    description: 'If you need something from me, use `/` to see my all my commands!\nRemember that if you do not see my slash commands it is because the bot does not have the necessary permissions to be able to use them on your server.\nDont forget to activate the `Administrator` permission to the bot to be able to use the slash commands.',
                    color: color,
                }
            ]
        });
        return;
    }
});

function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}