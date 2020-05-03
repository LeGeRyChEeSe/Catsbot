module.exports = {
  name: "mp",
  description:
    "Mentionne toutes les personnes mentionnées par l'utilisateur et envoie un message privé à chacune d'entre elles pour les informer de la mention, et où se situe la mention.",
  help:
    "Nécessite de mentionner quelqu'un via **@** suivi de son nom d'utilisateur.\nPar exemple : c?mp @LeGeRyChEeSe\n\nIl est aussi possible de mentionner plusieurs personnes à la fois en mettant les mentions à la suite les unes des autres.",
  syntaxe: "c?mp <mention>",
  execute(msg, args) {
    const channel = msg.channel.name;
    const tableau = [];
    for (let mention = 0; mention < args.length; mention++) {
      if (args[mention].startsWith("<@!")) {
        const user = args[mention];
        const search_user = msg.channel.members.get(
          user.substring(3, user.length - 1)
        );
        msg.delete();
        tableau.push(`${search_user} est demandé dans le canal **${channel}**`);
        search_user.send(
          `Hello ${search_user} ! ${msg.author} te réclame sur le serveur __**${msg.guild.name}**__ dans le canal **#${channel}** !`
        );
      } else if (args[mention].startsWith("<@")) {
        const user = args[mention];
        const search_user = msg.channel.members.get(
          user.substring(2, user.length - 1)
        );
        msg.delete();
        tableau.push(`${search_user} est demandé dans le canal **${channel}**`);
        search_user.send(
          `Hello ${search_user} ! ${msg.author} te réclame sur le serveur __**${msg.guild.name}**__ dans le canal **#${channel}** !`
        );
      } else {
        tableau.push(
          `**${args[mention]}** n'est pas un utilisateur mentionné. Veuillez entrer **@** avant le nom d'utilisateur.`
        );
      }
    }
    msg.channel.send(`${tableau.join("\n")}`);
  }
};
