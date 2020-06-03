const { Collection, MessageEmbed } = require("discord.js");

module.exports.run = (msg, args, client) => {
  const prefix = client.env.get(msg.guild.id).get("prefix");

  if (args.length !== 0) {
    const embed = new MessageEmbed();

    // Aide d'une commmande spécifique
    client.commands.each((Commandes, Name) => {
      Commandes.forEach(help => {
        const info = help.help;
        let tabCommandes = new Array();

        if (
          args[0] === help.help.name ||
          args[0] === `${prefix}${help.help.name}`
        ) {
          embed.setTitle(info.title);
          embed.setColor("RANDOM");
          embed.setDescription(info.description);
          embed.setThumbnail(client.user.displayAvatarURL());
          embed.addField("Informations supplémentaires :", info.help);
          embed.addField("Syntaxe :", `\`${prefix}${info.syntaxe}\``);
          embed.setTimestamp();
          embed.setFooter(client.user.username);
        } else if (args[0].toLowerCase() === Name.toLowerCase()) {
          embed.setTitle(Name);
          embed.setColor("RANDOM");
          embed.setThumbnail(client.user.displayAvatarURL());
          Commandes.forEach(name => tabCommandes.push(`\`${prefix}${name.help.name}\``));
          embed.setDescription(tabCommandes.join(", "));
          embed.setFooter(client.user.username);
          embed.setTimestamp();
        }
      });
    });
    return msg.channel.send(embed);
  }

  const dev = msg.guild.members.resolve("440141443877830656");

  const embed = new MessageEmbed()
    .setTitle("**HELP**")
    .setAuthor(client.user.username)
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Dev : ${dev.user.tag} (${dev.presence.status})`);

  // Aide sur l'ensemble des commandes
  client.commands.each((Commandes, Name) => {

    let tabCommandes = new Array();

    Commandes.forEach(commande => {
      tabCommandes.push(`\`${prefix}${commande.help.name}\``);
    });

    embed.addField(Name.toUpperCase(), tabCommandes.join(", "), true);
  });
  embed.addField(
    "Pour plus d'informations sur une commande :",
    `Tapez par exemple ${prefix}help p pour obtenir des informations supplémentaires sur la commande play.`
  );
  return msg.channel.send(embed);
};

module.exports.help = {
  name: "help",
  title: "Afficher l'aide",
  description: "Renvoi la liste de toutes les commandes disponibles sur le bot",
  help: `\`?help <commande>\` renvoi les informations supplémentaires de la commande passée en paramètre de ?help.`,
  syntaxe: "help <commande>",
  permissions: {
    admin: true,
    lieutenants: true,
    major: true,
    membres: true
  }
};
