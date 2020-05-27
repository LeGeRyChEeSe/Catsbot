const { MessageEmbed } = require("discord.js");

module.exports.run = (msg, args, client) => {
  const guild = client.env.get(msg.guild.id);
  const prefix = guild.get("prefix");
  const variable = guild.keyArray().find(r => r === args[0]);
  let valeur = guild.get(args[0]);

  if (!args.length) {
    return msg.channel.send(
      `La liste des variables d'environnement modifiables est ici :\n\n${guild
        .keyArray()
        .join(
          "\n"
        )}\n\nPour connaître le contenu d'une variable veuillez taper la commande ?cfg <variable> en remplacant <variable> par le nom de la variable. Par exemple ${prefix}cfg prefix renvoi par défaut la valeur "${prefix}".`
    );
  } else if (args.length === 1 && guild.has(args[0])) {
    return msg.channel.send(
      `${variable} : ${valeur}\n\nPour modifier cette variable, tapez ${prefix}cfg ${variable} <nouvelle valeur>`
    );
  } else if (args.length > 1 && guild.has(args[0])) {
    guild.set(args[0], args[1]);
    return msg.channel.send(`${variable} : ${args[1]}`);
  }
};

module.exports.help = {
  name: "cfg",
  title: "Configurer Catsbot",
  description: "Configurer les variables d'environnement de Catsbot.",
  help:
    "Variables d'environnement de Catsbot configurables via la commande ?cfg <variable> \"<valeur>\":\n\nPour lister les variables d'environnement modifiables, tapez la commande ?cfg",
  syntaxe: 'cfg <variable> "<valeur>"',
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false
  }
};
