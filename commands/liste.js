module.exports = {
  name: "liste",
  description: "Permet d'afficher la liste d'attente des pistes",
  help:
    "Affiche la liste courante des prochaines pistes jouées dans le canal textuel. Affiche le lien YouTube de la piste en cours de lecture.",
  syntaxe: "liste",
  cooldown: 5,
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Aucune piste en cours.");
    return message.channel.send(`
__**Liste d'attente des pistes:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Piste en cours:** ${serverQueue.songs[0].title}
		`);
  }
};
