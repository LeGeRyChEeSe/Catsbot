const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg) => {
  const varEmbed = new MessageEmbed();
  varEmbed
    .setTitle(`Variables d'environnement de ${msg.guild.name}`)
    .setThumbnail(msg.guild.iconURL())
    .setTimestamp()
    .setFooter(client.user.username);

  Object.entries(msg.guild).forEach((keys, index) => {
    varEmbed.addField(keys[0], `\`${keys[1]}\``);
  });

  msg.channel.send(varEmbed);
};

module.exports.help = {
  name: "server",
  title: "Afficher les options de {guildName}",
  description: "Afficher les variables d'environnement de {guildName}",
  help: `Liste les variables d'environnement de {guildName} via la commande \`{prefix}server\``,
  syntaxe: "server",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
