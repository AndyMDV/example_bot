const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    name: 'instagram',
    description: 'Comando instagram',
    category: 'others',
    options: [
        {
            name: 'username',
            description: 'Please type the username',
            type: 3,
            required: true,//innecesario porque esta esto
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const args = interaction.options.getString('username');

        let url; 
        let response; 
        let account; 
        let details;

        try {
            url = `https://www.instagram.com/${args}/?__a=1`;//https://www.instagram.com/donalberto98/
            response = await axios.get(url);
            account = response.data;
            details = account.graphql.user;
        } catch (error) {
            return interaction.reply({ content: 'I cant find this account' });
        }

        return void interaction.reply({
            embeds: [
                {
                    title: `${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `,
                    description: details.biography,
                    thumbnail: details.profile_pic_url,
                    color: 'WHITE',
                    fields: [
                        {
                            name: 'Total Posts:',
                            value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                            inline: true,
                        },
                        {
                            name: 'Followers:',
                            value: details.edge_followed_by.count.toLocaleString(),
                            inline: true,
                        },
                        {
                            name: 'Following:',
                            value: details.edge_follow.count.toLocaleString(),
                            inline: true,
                        },
                    ]
                }
            ]
        })
    }
}