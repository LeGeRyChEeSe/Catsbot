const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
  let user = await client.users.fetch(args[0]);
  const logCanal = client.env.get(msg.guild.id).get("logcanal");

  if (!user) return msg.reply("L'utilisateur n'existe pas !");

  msg.guild.members.unban(user);
  user.send(
    `Vous avez été débanni du serveur ${msg.guild} par ${msg.author} !`
  );

  msg.channel.send(`Les membres suivants ont été débanni :\n${user.tag} !`);

  const unbanEmbed = new MessageEmbed()
    .setAuthor(`${user.username}`)
    .setDescription(`a été débanni !`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL());

  client.channels.cache.get(logCanal.slice(2, -1)).send(unbanEmbed);
};

module.exports.help = {
  name: "unban",
  title: "Débannir un membre",
  description: "Permet de débannir un membre en le mentionnant",
  help: `Débannir un membre en indiquant son \`USER_ID\`\nExemple : \`{prefix}unban 1234568790`,
  syntaxe: "unban <user_id>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
