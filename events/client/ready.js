const config = require('./../../config');

module.exports =  {

    name: 'ready',
    once: true,
    async execute(client) {

        const bot = await client.guilds.cache.get(config.serverID);
        await bot.commands.set(client.commands.map(command => command));

        console.log('Je suis prêt !');
    }

}