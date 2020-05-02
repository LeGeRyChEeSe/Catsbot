module.exports = {
  name: "help",
  description: "Renvoie la liste de toutes les commandes disponibles sur le bot",
  execute(msg, args, client) {
    for (const cmd of client.commands) {
      const help = cmd;
      msg.delete();
      msg.channel.send(`***c?${help[0]}*** : *${help[1].description}*`);
    }
  }
};
