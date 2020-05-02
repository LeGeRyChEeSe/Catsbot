module.exports = {
  name: "help",
  description:
    "Renvoie la liste de toutes les commandes disponibles sur le bot",
  execute(msg, args, client) {
    for (const cmd of client.commands) {
      msg.delete();
      msg.channel.send(`***c?${cmd[0]}*** : *${cmd[1].description}*`);
    }
  },
};
