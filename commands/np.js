module.exports = {
  name: "np",
  description: "Affiche la piste en cours.",
  help:
    "Permet d'afficher dans le canal de texte le nom de la piste qui est jouée actuellement dans votre canal vocal.",
  syntaxe: "np",
  cooldown: 5,
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Aucune piste n'est en cours");
    return message.channel.send(
      `🎶 Piste actuelle : **${serverQueue.songs[0].title}**`
    );
  }
};
