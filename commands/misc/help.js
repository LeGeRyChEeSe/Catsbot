const { MessageEmbed } = require("discord.js");

module.exports.run = (msg, args, client) => {
    if (args.length !== 0) {
      for (const help of client.commands.help) {
        if (args[0] === help[1].name || args[0] === `c?${help[1].name}`) {
          const info = help[1];
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

    const embed = new MessageEmbed()
      .setTitle("**HELP**")
      .setAuthor(client.user.username)
      .setColor("RANDOM")
      .setDescription("__**Liste non exhaustive des commandes du bot :**__")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter(
        `${msg.guild.members.resolve("440141443877830656").displayName} (${
          msg.guild.members.resolve("440141443877830656").presence.status
        })`
      );

    for (const cmd of client.commands.help) {
      const commandName = client.config.prefix + cmd[1].name;
      embed.addField(`**\`${commandName}\`**`, `*${cmd[1].description}*\n`);
    }

    embed.addField(
      "Pour plus d'informations sur une commande :",
      `*Tapez par exemple* **\`${client.config.prefix}help play\`** *pour obtenir des informations supplémentaires sur la commande play.*`
    );

    return msg.channel.send(embed);
  };

module.exports.help = {
  name: "help",
  description: "Renvoi la liste de toutes les commandes disponibles sur le bot",
  help:
    "c?help *<commande>* renvoi les informations supplémentaires de la commande passée en paramètre de c?help.",
  syntaxe: "help <commande>",
}
