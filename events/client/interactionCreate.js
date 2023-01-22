module.exports = {

    name: 'interactionCreate',
    once: false,
    async execute(client, message) {
        if(message.isCommand() || message.isContextMenu()) {
            const command = client.commands.get(message.commandName);
            if(!command) {
                return message.reply("Cette commande n'existe pas!");
            }
            if(!message.member.permissions.has([command.permission])) {
                return message.reply("Vous n'avez pas la/les permission(s) requise(s) pour taper cette commande !");
            }
            command.runInteraction(client, message);
        } else if(message.isButton()) {
            const buttons = client.buttons.get(message.customId);
            if(!buttons) {
                return message.reply("Ce boutton n'existe pas!");
            }
            buttons.runInteraction(client, message);
        } else if(message.isModalSubmit()) {

        }
    }

}