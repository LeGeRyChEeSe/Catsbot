const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Renvoie la liste de toutes les commandes disponibles sur le bot",
  execute(msg, args, client) {
    const tableau = [];
    for (const cmd of client.commands) {
      msg.delete();
      tableau.push(`***c?${cmd[0]}*** : *${cmd[1].description}*`);
    }
    
    msg.channel.send(`${tableau.join("\n\n").concat(" :\n\t")}`);

  },
};
