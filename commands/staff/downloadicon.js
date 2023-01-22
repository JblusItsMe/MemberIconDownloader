const Discord = require('discord.js');
const config = require('./../../config');
const request = require('request');
const fs = require('fs');
const {MessageEmbed} = require("discord.js");

module.exports = {

    name: 'downloadicon',
    description: "Download all member logos from your discord server.",
    usage: "/downloadicon",
    display: "staff",
    permission: "ADMINISTRATOR",
    async runInteraction(client, message) {
        const start = new MessageEmbed()
            .setColor(config.color)
            .setDescription("Launch of the program");
        const downloadImage = new MessageEmbed()
            .setColor(config.color)
            .setDescription("I download all the data");
        const finish = new MessageEmbed()
            .setColor(config.color)
            .setDescription("I finished downloading everything.");

        await message.reply({embeds: [start, downloadImage]});

        let guild = client.guilds.cache.get(config.serverID);
        let members = guild.members.fetch();
        (await members).forEach(m => {
            let avatar = m.displayAvatarURL();
            const path = `./result/${m.id}.png`;
            request(avatar).pipe(fs.createWriteStream(path));
        });
        await message.channel.send({embeds: [finish]});

    }

}