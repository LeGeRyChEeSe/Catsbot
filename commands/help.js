const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Renvoie la liste de toutes les commandes disponibles sur le bot",
  help:
    "c?help *<commande>* renvoie les informations supplémentaires de la commande passée en paramètre de c?help.",
  syntaxe: "c?help <commande>",
  execute(msg, args, client) {
    const tableau = [];
    if (args.length !== 0) {
      for (const help of client.commands) {
        if (args[0] === help[1].name || args[0] === `c?${help[1].name}`) {
          let info = help[1];
          msg.delete();
          const embed = new MessageEmbed()
            .setTitle(`c?${info.name}`)
            .setColor("RANDOM")
            .setDescription(info.description)
            .setThumbnail(client.user.displayAvatarURL())
            .addField("Informations supplémentaires :", info.help)
            .addField("Syntaxe :", info.syntaxe)
            .setTimestamp()
            .setFooter(client.user.username);

          return msg.channel.send(embed);
        }
      }
    }
    for (const cmd of client.commands) {
      msg.delete();
      tableau.push(`***c?${cmd[1].name}*** : *${cmd[1].description}*`);
    }

    const embed = new MessageEmbed()
      .setTitle("__**HELP**__")
      .setColor("RANDOM")
      .setDescription("*Liste non exhaustive des commandes du bot :*")
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        "Différentes commandes :",
        tableau.join("\n\n").concat(" :\n\t")
      )
      .addField(
        "Pour plus d'informations sur une commande :",
        "*Tapez par exemple **c?help play** pour obtenir des informations supplémentaires sur la commande play.*"
      )
      .setTimestamp()
      .setFooter(client.user.username);

    return msg.channel.send(embed);

    msg.channel.send(
      `__**Liste non exhaustive de toutes les commandes du bot :**__\n\n${tableau
        .join("\n\n")
        .concat(
          " :\n\t"
        )}\n*Pour plus d'informations sur une commande, tapez par exemple **c?help play** pour obtenir des informations supplémentaires sur la commande play.*`
    );
  }
};
