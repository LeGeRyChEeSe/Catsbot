module.exports = {
  name: "skip",
  description: "Permet de passer la piste actuelle.",
  help:
    "Joue la piste suivante en stoppant la piste actuelle. Celle-ci est donc supprimée de la liste d'attente.",
  syntaxe: "skip",
  cooldown: 5,
  execute(message) {
    message.delete();
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Vous devez être dans un canal pour jouer la piste"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune piste à passer.");
    console.log(serverQueue);
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.end(
      "🎶 La piste suivante va être jouée. 🎶"
    );
  },
};
