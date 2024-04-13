/**
 * @author LiteCoreTeam
 * @version 1.0.0
 * @github https://github.com/LiteCoreTeam/node-vk-rcon
 * @vk https://vk.com/litecore_team
 * @telegram https://t.me/litecoreteam
 */

const config = require("./config.json");
const rcon = require("./src/MinecraftRCON");
const { VK } = require("vk-io");
const vk = new VK({
    token: config.access_token,
    pollingGroupId: config.group_id
});

vk.updates.on(["message_new"], async (context)=> {
    if(context.senderId < 0) {
        return;
    }

    if(context.text.indexOf("/")) {
        let string = context.text.substring(1);
    }
});

vk.updates.start().then(()=> {
    console.log("RCON-Бот успешно запущен!");
});