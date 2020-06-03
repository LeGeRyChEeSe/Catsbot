module.exports.run = (client, msg, args) => {
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue) return msg.channel.send("Aucune piste en cours.");
  return msg.channel.send(`
__**Liste d'attente des pistes:**__
${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}
**Piste en cours:** ${serverQueue.songs[0].title}
		`);
};

module.exports.help = {
  name: "liste",
  title: "Liste des pistes",
  description: "Permet d'afficher la liste d'attente des pistes",
  help:
    "Affiche la liste courante des prochaines pistes jouées dans le canal textuel. Affiche le lien YouTube de la piste en cours de lecture.",
  syntaxe: "liste",
  cooldown: 5,
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true,
  },
};
