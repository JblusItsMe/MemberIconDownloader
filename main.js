const Discord = require('discord.js');
const config = require('./config');
const logger = require('./logger');
const client = new Discord.Client({intents: 3276799});

client.commands = new Discord.Collection(); logger.client('Nouvelle collection chargée => commands');
client.buttonts = new Discord.Collection(); logger.client('Nouvelle collection chargée => buttons');

require('./stuctures/ButtonsLoader')(client);
require('./stuctures/CommandsLoader')(client);
require('./stuctures/EventsLoader')(client);

process.on('exit', code => {
    logger.error(`Le processus s'est arrêté avec le code: ${code}`);
});
process.on('uncaughtException', (err, origin) => {
    logger.error(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`);
});
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`UNHANDLED_REJECTION: ${reason}`, promise);
});
process.on('warning', (...args) => {
    logger.warn(...args);
});

client.login(config.token).then();