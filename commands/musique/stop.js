module.exports.run = (msg) => {
  msg.delete();
  const { channel } = msg.member.voice;
  if (!channel)
    return msg.channel.send(
      "Vous devez être dans le canal pour jouer de la musique !"
    );
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue) return msg.channel.send("Aucune musique en cours.");
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  msg.channel.send("🎶 La musique a été coupée ! 🎶");
};

module.exports.help = {
  name: "stop",
  title: "Arrêter la piste",
  description: "Permet de stopper la musique.",
  help:
    "Arrête la piste actuelle, supprime toutes les musiques de la liste d'attente, mais le bot reste connecté.",
  syntaxe: "stop",
  cooldown: 5,
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true,
  },
};
