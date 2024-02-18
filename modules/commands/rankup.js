module.exports.config = {
  name: "levelup",
  version: "1.0.2",
  hasPermssion: 1,
  credits: "Mirai Team mod by Mank",
  description: "Thông báo rankup random gif cho từng nhóm, người dùng",
  commandCategory: "Hệ Thống",
  dependencies: {
    "fs-extra": ""
  },
  cooldowns: 0,
  envConfig: {
    autoUnsend: true,
    unsendMessageAfter: 40
  }
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/rankup/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "rankup1.gif")) request 
    ("https://i.imgur.com/YcpPIbV.gif").pipe(fs.createWriteStream(dirMaterial + "rankup1.gif")); 
    if (!fs.existsSync(dirMaterial + "rankup2.gif")) request  
    ("https://i.imgur.com/YcpPIbV.gif").pipe(fs.createWriteStream(dirMaterial + "rankup2.gif")); 
    if (!fs.existsSync(dirMaterial + "rankup3.gif")) request 
    ("https://i.imgur.com/YcpPIbV.gif").pipe(fs.createWriteStream(dirMaterial + "rankup3.gif")); 
}
// Có sẵn hàm dowload cho gif
module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
  var {threadID, senderID } = event;
  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];

  threadID = String(threadID);
  senderID = String(senderID);

  const thread = global.data.threadData.get(threadID) || {};

  let exp = (await Currencies.getData(senderID)).exp;
  exp = exp += 1;

  if (isNaN(exp)) return;

  if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
    await Currencies.setData(senderID, { exp });
    return;
  };

  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
  const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

  if (level > curLevel && level != 1) {
    const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
    var messsage = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup,
      arrayContent;

    messsage = messsage
      .replace(/\{name}/g, name)
      .replace(/\{level}/g, level);
let random = Math.floor(Math.random() * 3) + 1;//random gif , có bao nhiêu thay sau dấu * bấy nhiêu . Thêm gif và đổi tên thành rankup1/2/3.gif
    if (existsSync(__dirname + "/cache/rankup/")) mkdirSync(__dirname + "/cache/rankup/", { recursive: true });
    if (existsSync(__dirname + `/cache/rankup/rankup${random}.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/cache/rankup/rankup${random}.gif`), mentions: [{ tag: name, id: senderID }] };
    else arrayContent = { body: messsage, mentions: [{ tag: name, id: senderID }] };
    const moduleName = this.config.name;
    api.sendMessage(arrayContent, threadID, async function (error, info){
      if (global.configModule[moduleName].autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].unsendMessageAfter * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    });
  }

  await Currencies.setData(senderID, { exp });
  return;
}

module.exports.languages = {
  "vi": {
    "off": "tắt",
    "on": "bật",
    "successText": "thành công thông báo Levelup!",
    "levelup": "Trình độ của {name} đã đạt tới level {level}"
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success notification rankup!",
    "levelup": "{name}, your keyboard hero level has reached level {level}",
  }
}

module.exports.run = async function({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
  else data["rankup"] = false;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}