const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
  if (!args.length)
    return msg.reply(
      `Veuillez mentionner un membre à muter. Pour plus d'informations sur la commande \`mute\` veuillez taper \`${client.env
        .get(msg.guild.id)
        .get("prefix")}help mute\`.`
    );

  const envVariables = client.env.get(msg.guild.id);
  const clientMuteRole = envVariables.get("muterole");
  const logCanal = envVariables.get("logcanal");
  let user = msg.guild.member(msg.mentions.users.first());
  let muteRole = msg.guild.roles.cache.find((r) => r.name === clientMuteRole);
  let muteTime = args[1] || "60s";

  if (!muteRole) {
    muteRole = await msg.guild.roles.create({
      data: {
        name: clientMuteRole,
        color: "BLUE",
        permissions: [],
      },
    });

    msg.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });
    });
  }

  await user.roles.add(muteRole.id);

  msg.channel.send(`<@${user.id}> a été muté pour ${ms(ms(muteTime))} !`);

  const muteEmbed = new MessageEmbed()
    .setAuthor(`${user.displayName}`)
    .setDescription(`muté pour ${ms(ms(muteTime))} !`)
    .setThumbnail(user.user.avatarURL())
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL());

  client.channels.cache.get(logCanal.slice(2, -1)).send(muteEmbed);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));
};

module.exports.help = {
  name: "mute",
  title: "Muter un membre",
  description: "Permet de muter un membre pendant un temps donné",
  help:
    "Muter un membre pour l'empêcher d'écrire dans tous les canaux. Préciser le temps après avoir mentionné le membre :\nSecondes : `<temps>s`\nMinutes : `<temps>m`\nHeures : `<temps>h`\nEtc.",
  syntaxe: "mute <@membre> <temps>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
