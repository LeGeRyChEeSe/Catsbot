const { MessageEmbed } = require("discord.js");

module.exports.run = (msg, args, client) => {
  if (args.length !== 0) {
    for (const help of client.commands) {
      console.log(help);
      if (
        args[0] === help[1].help.name ||
        args[0] === `${client.config.prefix}${help[1].help.name}`
      ) {
        const info = help[1].help;
        msg.delete();
        const embed = new MessageEmbed()
          .setTitle(`${client.config.prefix}${info.name}`)
          .setColor("RANDOM")
          .setDescription(info.description)
          .setThumbnail(client.user.displayAvatarURL())
          .addField("Informations supplémentaires :", info.help)
          .addField("Syntaxe :", `\`${client.config.prefix}${info.syntaxe}\``)
          .setTimestamp()
          .setFooter(client.user.username);

        return msg.channel.send(embed);
      }
    }
  }

  msg.delete();

  const dev = msg.guild.members.resolve("440141443877830656");

  const embed = new MessageEmbed()
    .setTitle("**HELP**")
    .setAuthor(client.user.username)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(
      `Dev : ${dev.user.tag} (${
        dev.presence.status
      })`
    );
  client.commands.each(category => {
    console.log(category);
    embed.addField(
      category.help.title,
      `${client.config.prefix}${category.help.name}`,
      true
    );
  });

  /*
    cmd.each(commande => {
      embed.addField(
        commande.help.title,
        `\`${commandName} ${commande.help.name}\``,
        true
      );
    });
    */
  return msg.channel.send(embed);
};

module.exports.help = {
  name: "help",
  title: "Afficher l'aide",
  description: "Renvoi la liste de toutes les commandes disponibles sur le bot",
  help:
    "c?help *<commande>* renvoi les informations supplémentaires de la commande passée en paramètre de c?help.",
  syntaxe: "help <commande>"
};
