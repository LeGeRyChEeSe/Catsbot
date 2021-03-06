module.exports.run = (client, msg, args) => {
  const channel = msg.channel.id;
  const tableau = [];
  const argument = [];
  for (let mention = 0; mention < args.length; mention++) {
    if (args[mention].startsWith("<@!")) {
      const user = args[mention];
      const search_user = msg.channel.members.get(
        user.substring(3, user.length - 1)
      );
      tableau.push(
        `${search_user} est demandé dans le canal **${client.channels.cache.find(
          (r) => r.id === channel
        )}**`
      );
      search_user.send(
        `Hello ${search_user} ! ${
          msg.member.displayName
        } te réclame sur le serveur __**${
          msg.guild.name
        }**__ dans le canal **${client.channels.cache.find(
          (r) => r.id === channel
        )}** !`
      );
    } else if (args[mention].startsWith("<@")) {
      const user = args[mention];
      const search_user = msg.channel.members.get(
        user.substring(2, user.length - 1)
      );
      tableau.push(
        `${search_user} est demandé dans le canal **${client.channels.cache.find(
          (r) => r.id === channel
        )}**`
      );
      search_user.send(
        `Hello ${search_user} ! ${
          msg.member.displayName
        } t'a mentionné sur le serveur __**${
          msg.guild.name
        }**__ dans le canal **${client.channels.cache.find(
          (r) => r.id === channel
        )}** !`
      );
    } else {
      argument.push(`**${args[mention]}**`);
    }
  }
  msg.channel.send(`${tableau.join("\n")}\n${argument.join(" ")}`);
};

module.exports.help = {
  name: "mp",
  title: "Mentionner un membre",
  description:
    "Mentionne toutes les personnes mentionnées par l'utilisateur et envoi un message privé à chacune d'entre elles pour les informer de la mention, et où se situe la mention.",
  help: `Nécessite de mentionner quelqu'un via \`@\` suivi de son nom d'utilisateur.\nPar exemple : \`{prefix}mp @LeGeRyChEeSe\`\n\nIl est aussi possible de mentionner plusieurs personnes à la fois en mettant les mentions à la suite les unes des autres.`,
  syntaxe: "mp <@membre(s)>",
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true,
  },
};
