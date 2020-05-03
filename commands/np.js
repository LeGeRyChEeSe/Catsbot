module.exports = {
  name: "np",
  description: "Affiche la piste en cours.",
  cooldown: 5,
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Aucune piste n'est en cours");
    return message.channel.send(
      `🎶 Now playing: **${serverQueue.songs[0].title}**`
    );
  },
};
