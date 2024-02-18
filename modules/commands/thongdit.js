const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "thongdit",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MAVERICK",
  description: "thong dit",
  commandCategory: "Hành động",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = ["https://genk.mediacdn.vn/2017/kaka-1487044979980.gif"];

   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
   var callback = () => api.sendMessage({body:`${tag}` + ` Thông chết con đĩ moẹ m 🍑`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/thongdit.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/thongdit.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/thongdit.gif")).on("close",() => callback());
   }