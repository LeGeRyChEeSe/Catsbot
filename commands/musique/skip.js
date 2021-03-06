module.exports.run = (client, msg, args) => {
  const { channel } = msg.member.voice;
  if (!channel)
    return msg.channel.send(
      "Vous devez être dans un canal pour jouer la piste"
    );
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue) return msg.channel.send("Il n'y a aucune piste à passer.");
  console.log(serverQueue);
  serverQueue.playing = false;
  serverQueue.connection.dispatcher.end(
    "🎶 La piste suivante va être jouée. 🎶"
  );
};

module.exports.help = {
  name: "skip",
  title: "Jouer la piste suivante",
  description: "Permet de passer la piste actuelle.",
  help:
    "Joue la piste suivante en stoppant la piste actuelle. Celle-ci est donc supprimée de la liste d'attente.",
  syntaxe: "skip",
  cooldown: 5,
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true,
  },
};
