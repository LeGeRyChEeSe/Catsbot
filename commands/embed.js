const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Renvoie un embed",
  execute(msg, args, client) {
    const user = msg.mentions.users.first();
    let status_user = "";
    if (user.presence.status === "offline") {
      status_user = " :red_circle: ";
    } else {
      status_user = " :green_circle: ";
    }
    msg.delete();
    const embed = new MessageEmbed()
      .setTitle(status_user + user.username + status_user)
      .setDescription(user.tag)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        {
          name: "Date de création du compte:",
          value: `${user.createdAt.getDate()}/${
            user.createdAt.getMonth() + 1
          }/${user.createdAt.getFullYear()}`,
          inline: true,
        },
        {
          name: " soit",
          value: `${Math.round(
            (Date.now() - user.createdTimestamp) / 86400000
          )} jours d'activité`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter(user.presence.status);

    msg.channel.send(embed);
  },
};
