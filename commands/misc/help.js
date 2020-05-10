const { MessageEmbed } = require("discord.js");

module.exports.run = (msg, args, client) => {
  if (args.length !== 0) {
              const embed = new MessageEmbed()

    client.commands.each(category => {
      category.forEach(help => {
        if (
          args[0] === help.help.name ||
          args[0] === `${client.config.prefix}${help.help.name}`
        ) {
          const info = help.help;
          msg.delete();
            embed.setTitle(`${client.config.prefix}${info.name}`)
            embed.setColor("RANDOM")
            embed.setDescription(info.description)
            embed.setThumbnail(client.user.displayAvatarURL())
            embed.addField("Informations supplémentaires :", info.help)
            embed.addField("Syntaxe :", `\`${client.config.prefix}${info.syntaxe}\``)
            embed.setTimestamp()
            embed.setFooter(client.user.username);
        }
      });
    });
    return msg.channel.send(embed);
  }

  msg.delete();

  const dev = msg.guild.members.resolve("440141443877830656");

  const embed = new MessageEmbed()
    .setTitle("**HELP**")
    .setAuthor(client.user.username)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Dev : ${dev.user.tag} (${dev.presence.status})`);

  client.commands.each(category => {
    category.forEach(commande => {
      embed.addField(
        commande.help.title,
        `${client.config.prefix}${commande.help.name}`,
        true
      );
    });
  });
  embed.addField("Pour plus d'informations sur une commande :", `Tapez par exemple ${client.config.prefix}help play pour obtenir des informations supplémentaires sur la commande play.`);
  return msg.channel.send(embed);
};

module.exports.help = {
  name: "help",
  title: "Afficher l'aide",
  description: "Renvoi la liste de toutes les commandes disponibles sur le bot",
  help:
    "c?help *<commande>* renvoi les informations supplémentaires de la commande passée en paramètre de c?help.",
  syntaxe: "help <commande>",
  permissions: {
    "admin": true,
    "lieutenants": true,
    "major": true,
    "membres": true
  }
};
