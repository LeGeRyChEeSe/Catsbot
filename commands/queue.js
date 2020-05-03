module.exports = {
  name: "queue",
  description: "Permet d'afficher la liste d'attente des pistes",
  cooldown: 5,
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Aucune piste en cours.");
    return message.channel.send(`
__**Liste d'attente des pistes:**__
${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}
**Piste en cours:** ${serverQueue.songs[0].url}
		`);
  },
};
