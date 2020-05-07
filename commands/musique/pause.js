module.exports.run = (msg) => {
  msg.delete();
    const serverQueue = msg.client.queue.get(msg.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("⏸ La musique est en pause !");
    }
    return msg.channel.send("Aucune piste en cours.");
};

module.exports.help = {
  name: "pause",
  description: "Permet de mettre en pause la piste actuelle.",
  help:
    "Permet de mettre en pause le lecteur sans que le bot ne quitte le canal.",
  syntaxe: "pause",
  cooldown: 5,
}