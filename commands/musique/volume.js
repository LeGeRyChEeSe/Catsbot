module.exports.run = (msg, args) => {
  msg.delete();
  const { channel } = msg.member.voice;
  if (!channel)
    return msg.channel.send(
      "Vous devez être dans un canal vocal pour jouer une piste !"
    );
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue)
    return msg.channel.send("Aucune piste n'est jouée actuellement.");
  if (!args[0])
    return msg.channel.send(`Le volume actuel est : **${serverQueue.volume}**`);
  serverQueue.volume = args[0]; // eslint-disable-line
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  return msg.channel.send(`A présent le volume est à : **${args[0]}**`);
};

module.exports.help = {
  name: "volume",
  title: "Modifier le volume",
  description: "Permet de modifier le volume de la piste.",
  help:
    "Modifier le volume en passant en paramètre de la commande le volume entre 0 et 100",
  syntaxe: "volume <volume>",
  cooldown: 5,
};
