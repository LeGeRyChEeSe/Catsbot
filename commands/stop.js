module.exports = {
  name: "stop",
  description: "Permet de stopper la musique.",
  help:
    "Arrête la piste actuelle, supprime toutes les musiques de la liste d'attente, mais le bot reste connecté.",
  syntaxe: "stop",
  cooldown: 5,
  execute(message) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Vous devez être dans le canal pour jouer de la musique !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Aucune musique en cours.");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.channel.send("🎶 La musique a été coupée ! 🎶");
    message.delete();
  },
};
