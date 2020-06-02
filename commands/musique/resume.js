module.exports.run = (msg) => {
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return msg.channel.send("▶ La piste va reprendre !");
  }
  return msg.channel.send("Aucune piste n'est jouée actuellement.");
};

module.exports.help = {
  name: "resume",
  title: "Relancer la musique",
  description: "Permet de reprendre le lecture de la piste.",
  help:
    "Permet de relancer la lecture de la piste audio si le bot est présent dans votre canal vocal.",
  syntaxe: "resume",
  cooldown: 5,
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true,
  },
};
