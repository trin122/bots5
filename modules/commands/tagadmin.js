const fs = require('fs');
const moment = require('moment-timezone');
module.exports.config = {
    name: "tagadmin",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "hi<@shibaSama>",
    description: "Tag",
    commandCategory: "Admin",
    usages: "[msg]",
    cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "bank.gif")) request("https://i.imgur.com/SkUaa4Y.gif ").pipe(fs.createWriteStream(dirMaterial + "bank.gif"));
                       }

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads, args }) {
let uid = event.senderID;
var msg = [`ljkj`];
    const { threadID, messageID, body } = event;
    switch (handleReply.type) {
        case "tagadmin": {
            let name = await Users.getNameUser(handleReply.author);
            api.sendMessage({body: `====『 𝗔𝗗𝗠𝗜𝗡 』====\n◆━━━━━━━━━━━━━━━━━━━━◆\n💬 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${body}\n👤 𝗮𝗱𝗺𝗶𝗻: ${name || "Người dùng facebook"}\n🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: fb.com/${event.senderID}\n⏰ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\n𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 ( 𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 ) 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻 `, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')}, handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
        case "reply": {
            let name = await Users.getNameUser(event.senderID);
            api.sendMessage({body: `===== 𝗨𝗦𝗘𝗥 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞 =====\n━━━━━━━━━━━━━━━━━━\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${body}\n𝗡𝗮𝗺𝗲: ${name || "Người dùng facebook"}\n𝙗𝙤𝙭: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\n𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 (𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝗹𝗮̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗮𝗴`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')},handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.handleEvent = async ({ api, event, Users, Threads, args }) => {
    const { threadID, messageID, body, mentions, senderID } = event;
    let path = __dirname + "/cache/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(!mentions || !data[threadID]) return;
    let mentionsKey = Object.keys(mentions);
    let allAdmin = global.config.ADMINBOT;
    mentionsKey.forEach(async (each) => {
        if(each == api.getCurrentUserID()) return;
        if(allAdmin.includes(each)) {
            let userName = await Users.getNameUser(senderID);
            let threadName = await Threads.getInfo(threadID).threadName;
            api.sendMessage({body:`=====『 𝗧𝗔𝗚 𝗔𝗗𝗠𝗜𝗡 』=====\n◆━━━━━━━━━━━━━━━━━━━━◆\n👤 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗮𝗴: ${userName}\n👨‍👩‍👧‍👦 𝗕𝗼𝘅: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n💬 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${body}\n⏰ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\n𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 (𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝗹𝗮̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗮𝗴`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')},each, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        author: each,
                        threadID
                    })
                }
            })
        }
    })
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
const fs = require("fs");
    const { threadID } = event;
    let path = __dirname + "/cache/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(args[0] == "off") data[threadID] = false;
    else if(args[0] == "on") data[threadID] = true;
    else return api.sendMessage({body: `Vui lòng chọn tagadmin on off`, attachment: fs.createReadStream(__dirname + `/noprefix/bank.gif`)}, event.threadID, event.messageID);
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
    return api.sendMessage({body: `Tag Admin đã được ${data[threadID] ? "bật" : "tắt"}`, attachment: fs.createReadStream(__dirname + `/noprefix/bank.gif`)}, event.threadID, event.messageID);
};

async function downLoad(a, b) {
    await (require('image-downloader')).image({
        url: a, dest: b
    });
    return (require('fs-extra')).createReadStream(b);
};
