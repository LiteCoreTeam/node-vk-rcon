/**
 * @author LiteCoreTeam
 * @version 1.0.0
 * @github https://github.com/LiteCoreTeam/node-vk-rcon
 * @vk https://vk.com/litecore_team
 * @telegram https://t.me/litecoreteam
 */

const config = require("./config.json");
const rcon = require("./src/MinecraftRCON");
const VK = require("vk-io");
const vk = new VK({
    token: config.access_token
});

console.log("OK.");