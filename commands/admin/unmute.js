const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
  const envVariables = client.env.get(msg.guild.id);
  const clientMuteRole = envVariables.get("muterole");
  const logCanal = envVariables.get("logcanal");
  let user = msg.guild.member(msg.mentions.users.first());
  let muteRole = msg.guild.roles.cache.find((r) => r.name === clientMuteRole);

  if (!user.roles.cache.has(muteRole.id))
    return msg.reply(`${user.displayName} n'est pas muté !`);

  user.roles.remove(muteRole.id);

  msg.channel.send(`<@${user.id}> a été unmuté !`);

  const muteEmbed = new MessageEmbed()
    .setAuthor(`${user.displayName}`)
    .setDescription(`a été unmuté !`)
    .setThumbnail(user.user.avatarURL())
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL());

  client.channels.cache.get(logCanal.slice(2, -1)).send(muteEmbed);
};

module.exports.help = {
  name: "unmute",
  title: "Unmuter un membre",
  description: "Permet d'unmuter un membre",
  help: "Unmuter un membre en le mentionnant.",
  syntaxe: "unmute <@membre>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
