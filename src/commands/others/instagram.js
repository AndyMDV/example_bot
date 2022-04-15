const { Client, CommandInteraction } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'instagram',
    description: 'Comando instagram',
    options: [
        {
            name: 'username',
            description: 'Please type the username',
            type: 3,
            required: true,
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const username = interaction.options.getString('username');

        if (!username) return void interaction.reply({
            embeds: [
                {
                    title: 'Maybe it`s useful to actually search for someone...!',
                    color: 'RED',
                    footer: {
                        text: `Request by: ${interaction.user.username}`,
                        iconURL: interaction.user.avatarURL(),
                    }
                }
            ]
        });

        let url_search, response, account, details;
        let emote_verify = `<a:verified:727820439497211994>`;

        try {
            url_search = `https://instagram.com/${username}/?__a=1`;
            response = await axios.get(url_search);
            account = response.data;
            details = account.graphql.user;
        } catch {
            return void interaction.reply({
                embeds: [
                    {
                        title: `I cant find this account`
                    }
                ]
            });
        }

        return void interaction.reply({
            embeds: [
                {
                    title: `${details.is_verified ? `${details.username} ${emote_verify}` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `,
                    description: details.biography? `Bio:\n${details.biography}` : 'This account does not have a bio',
                    thumbnail: details.profile_pic_url,
                    fields: [
                        {
                            name: `Total post`,
                            value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                            inline: true,
                        },
                        {
                            name: 'Followers',
                            value: details.edge_followed_by.count.toLocaleString(),
                            inline: true,
                        },
                        {
                            name: 'Following',
                            value: details.edge_follow.count.toLocaleString(),
                            inline: true
                        }
                    ],
                    color: 'WHITE'
                }
            ]
        })
    }
}