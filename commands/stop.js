module.exports = {
  name: "stop",
  description: "Permet de stopper la musique.",
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
    serverQueue.connection.dispatcher.end("La musique a été coupée !");
  },
};
