const { MessageEmbed } = require("discord.js");

module.exports.run = (msg) => {
  const user = msg.mentions.members.first();
  let status_user = "";
  if (user.presence.status === "offline") status_user = " :white_circle: ";
  else if (user.presence.status === "online") status_user = " :green_circle: ";
  else if (user.presence.status === "idle") status_user = " :orange_circle: ";
  else if (user.presence.status === "dnd") status_user = " :red_circle: ";
  msg.delete();
  const embed = new MessageEmbed()
    .setTitle(`${status_user} ${user.user.username} ${status_user}`)
    .setColor(user.displayHexColor)
    .setDescription(user.user.tag)
    .setThumbnail(user.user.displayAvatarURL())
    .addFields(
      {
        name: `Date d'arrivée dans le serveur ${user.guild.name}:`,
        value: `${user.joinedAt.getDate()}/${
          user.joinedAt.getMonth() + 1
        }/${user.joinedAt.getFullYear()}`,
      },
      {
        name: "Son/Ses rôle(s) :",
        value: user.roles.cache.array(),
      }
    )
    .setTimestamp()
    .setFooter(user.presence.status);

  msg.channel.send(embed);
};

module.exports.help = {
  name: "embed",
  title: "Fiche Descriptive",
  description: "Renvoi la fiche d'une personne mentionnée",
  help:
    "Cette fiche permet d'afficher un petit encadré décrivant plusieurs informations concernant la personne mentionnée",
  syntaxe: "embed <mention>",
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false,
  },
};
