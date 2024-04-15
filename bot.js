const allowedUsers = [1,2,3]; //Айдишники вк тех, кому можно юзать бота
const notAllowedCommands = ["op", "deop", "stop"]; //Команды которые нельзя использовать
const config = require("./config.json");

const RCON = require("./src/MinecraftRCON");
const rcon = new RCON(config.rcon.address, config.rcon.port, config.rcon.password);

const { VK } = require("vk-io");
const vk = new VK({
    token: config.access_token,
    pollingGroupId: config.group_id
});

vk.updates.on(["message_new"], async (context)=> {
    if(context.senderId < 0) return;
    if(context.text.indexOf("/")) {
        let args = (context.text.substring(1)).split(" ");
        let commandName = args.shift();
        if(args.length == 0) args = null;

        if(allowedUsers.includes(context.senderId)) {
            context.send("Вы не можете отправлять запросы к RCON сервера!");
            return;
        }
    
        if(notAllowedCommands.includes(commandName)) {
            context.send("Использование данной команды запрещено!");
            return;
        }

        let connection = rcon.connect();
        let command = (`${commandName} ${args.slice(" ")}`).trim();
        rcon.sendCommand(connection, command);
        rcon.disconnect(connection);
    }
});

vk.updates.start().then(()=> {
    console.log("RCON-Бот успешно запущен!");
    console.log(`
* @author LiteCoreTeam
* @version 1.0.0
* @github https://github.com/LiteCoreTeam/node-vk-rcon
* @vk https://vk.com/litecore_team
* @telegram https://t.me/litecoreteam
`);
});