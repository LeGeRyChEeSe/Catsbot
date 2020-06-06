const { writeFile } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
  const guild = client.env.get(msg.guild.id);
  const prefix = guild.get("prefix");
  const variable = guild.keyArray().find((r) => r === args[0]);
  let valeur = guild.get(args[0]);
  const varEmbed = new MessageEmbed();

  if (!args.length) {
    varEmbed
      .setTitle("Variables d'environnement")
      .setAuthor(msg.guild.name)
      .setThumbnail(msg.guild.iconURL())
      .setDescription(
        "La liste des variables d'environnement modifiable est ici :"
      )
      .setFooter(`${prefix}cfg <variable>\n${prefix}cfg <variable> <value>`)
      .setTimestamp();

    guild.each((value, key) => {
      varEmbed.addField(key, value);
    });

    msg.channel.send(varEmbed);
  } else if (args.length === 1 && guild.has(args[0])) {
    varEmbed
      .setTitle(`Informations sur la variable \`${args[0]}\``)
      .addField(variable, `\`${valeur}\``)
      .setTimestamp()
      .setFooter(`${prefix}cfg ${variable} <nouvelle valeur>`);

    msg.channel.send(varEmbed);
  } else if (args.length > 1 && guild.has(args[0])) {
    varEmbed
      .setTitle(`A modifié la variable \`${args[0]}\``)
      .setAuthor(msg.member.displayName)
      .addField("*Ancienne valeur*", `${args[0]} : \`${guild.get(args[0])}\``);

    guild.set(args[0], args[1]);

    varEmbed.addField("**Nouvelle Valeur**", `${args[0]} : \`${args[1]}\``);

    msg.channel.send(varEmbed);
  }

  let toJSON = new Array();

  function envConfig(guildID, envVariables) {
    this.guildID = guildID;
    this.envVariables = envVariables;
  }

  client.env.each((collec, guildID) => {
    let envCfg = new envConfig(guildID, {
      prefix: collec.get("prefix"),
      welcome: collec.get("welcome"),
      modcanal: collec.get("modcanal"),
      vpncanal: collec.get("vpncanal"),
      logcanal: collec.get("logcanal"),
      logUser: collec.get("logUser"),
      lieutenants: collec.get("lieutenants"),
      major: collec.get("major"),
      muterole: collec.get("muterole"),
    });

    toJSON.push(envCfg);
  });

  let configJSON = JSON.stringify(toJSON);

  writeFile("./assets/struct/config.json", configJSON, (err) => {
    if (err) throw err;
  });
};

module.exports.help = {
  name: "cfg",
  title: "Configurer Catsbot",
  description: "Configurer les variables d'environnement de Catsbot.",
  help: `Variables d'environnement de Catsbot configurables via la commande \`{prefix}cfg <variable> <value>\`\n\nPour lister les variables d'environnement modifiables, tapez la commande \`{prefix}cfg\``,
  syntaxe: "cfg <variable> <value>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
