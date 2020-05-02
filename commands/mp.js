module.exports = {
  name: "mp",
  description:
    "Mentionne toutes les personnes mentionnées par l'utilisateur et envoie un message privé à chacune d'entre elles pour les informer de la mention, et où se situe la mention.",
  execute(msg, args) {
    const channel = msg.channel.name;
    for (let mention = 0; mention < args.length; mention++) {
      if (args[mention].startsWith("<@!")) {
        const user = args[mention];
        const search_user = msg.channel.members.get(
          user.substring(3, user.length - 1)
        );
        msg.delete();
        msg.channel.send(
          `${search_user} est demandé dans le canal **${channel}**`
        );
        search_user.send(
          `Hello ${search_user} ! ${msg.author} te réclame sur le serveur __**${msg.guild.name}**__ dans le canal **#${channel}** !`
        );
      }
    }
  },
};
