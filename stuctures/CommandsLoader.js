const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const logger = require('./../logger');


const permissionList = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES', 'MODERATE_MEMBERS'];

module.exports = async client => {

    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async commandFile => {
        const command = require(commandFile);

        if(!command.name) { return logger.warn(`Commande non-déclenché: Aucun nom! Fichier ${commandFile}`); }
        if(!command.description) { return logger.warn(`Commande non-déclenché: Aucune description! Fichier ${commandFile}`); }
        if(!command.usage) { return logger.warn(`Commande non-déclenché: Aucune aide! Fichier ${commandFile}`); }
        if(!command.display) { return logger.warn(`Commande non-déclenché: Aucune catégorie! Fichier ${commandFile}`); }
        if(!command.permission) { return logger.warn(`Commande non-déclenché: Aucune permission! Fichier ${commandFile}`); }

        if(!permissionList.includes(command.permission)) {
            return logger.typo(`Commande non-déclenché: Erreur de typo sur la permission! Fichier ${commandFile}`);
        }

        client.commands.set(command.name, command);
        logger.command(`Commande chargé: ${command.name}.js`);
    });

}