module.exports =  {

    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if(!message.guild) {
            return false;
        }
        if(message.author.bot) {
            return false;
        }
    }

}