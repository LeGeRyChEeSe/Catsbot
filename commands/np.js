const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np",
  description: "Affiche la piste en cours.",
  help:
    "Permet d'afficher dans le canal de texte le nom de la piste, sa description, et son URL qui est jouée actuellement dans votre canal vocal.",
  syntaxe: "np",
  cooldown: 5,
  execute(message, args, client) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        ":no_entry_sign: Aucune piste n'est en cours :no_entry_sign:"
      );
    console.log(serverQueue);
    const embed = new MessageEmbed()
      .setTitle(
        `${serverQueue.songs[0].title}\nDe ${serverQueue.songs[0].author.name}`
      )
      .setAuthor("Piste actuelle")
      .setURL(serverQueue.songs[0].url)
      .setColor("RANDOM")
      .setDescription(
        serverQueue.songs[0].description.slice(0, 300).concat("...")
      )
      .setThumbnail(serverQueue.songs[0].author.avatar)
      .setTimestamp()
      .setFooter(client.user.username)
      .setImage(
        serverQueue.songs[0].image[serverQueue.songs[0].image.length - 1].url
      );
    message.channel.send(embed);
    message.delete();
  },
};
