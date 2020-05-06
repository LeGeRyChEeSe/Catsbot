module.exports = {
  name: "volume",
  description: "Permet de modifier le volume de la piste.",
  help:
    "Modifier le volume en passant en paramètre de la commande le volume entre 0 et 100",
  syntaxe: "volume <volume>",
  cooldown: 5,
  execute(message, args) {
    message.delete();
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Vous devez être dans un canal vocal pour jouer une piste !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Aucune piste n'est jouée actuellement.");
    if (!args[0])
      return message.channel.send(
        `Le volume actuel est : **${serverQueue.volume}**`
      );
    serverQueue.volume = args[0]; // eslint-disable-line
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`A présent le volume est à : **${args[0]}**`);
  }
};
