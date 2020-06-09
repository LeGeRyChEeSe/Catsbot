const { Collection } = require("discord.js");
const ms = require("ms");

module.exports = (client, msg) => {
  // Fonction permettant d'exécuter des commandes via le bot
  // La syntaxe d'une commande est : ?<commande> <argument>
  // Par exemple je veux m'ajouter le rôle test : ?role test

  // console.log(msg.content);

  let prefix = "?";

  if (
    msg.channel.id ===
      client.env.get(msg.guild.id).get("qrcanal").slice(2, -1) &&
    msg.attachments.first()
  ) {
    console.log(
      msg.author.username,
      " : ",
      msg.guild.name,
      " : ",
      msg.content,
      "(Va être effacé dans 1 heure.)",
      msg.attachments
    );
    msg.delete({ timeout: 60 * 60 * 1000 });
  }

  if (msg.guild && client.env.has(msg.guild.id))
    prefix = client.env.get(msg.guild.id).get("prefix");

  if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;

  const variablesEnv = new Collection();

  if (!client.env.has(msg.guild.id)) {
    variablesEnv.set("prefix", "?");
    variablesEnv.set("welcome", "<Put Channel ID here>");
    variablesEnv.set("modcanal", "<Put Channel ID here>");
    variablesEnv.set("vpncanal", "<Put Channel ID here>");
    variablesEnv.set("logcanal", "<Put Channel ID here>");
    variablesEnv.set("logUser", "<Put User ID here>");
    variablesEnv.set("lieutenants", "<Put Role ID here>");
    variablesEnv.set("major", "<Put Role ID here>");
    variablesEnv.set("muterole", "<Put Role name here>");
    variablesEnv.set("qrcanal", "<Put Channel ID here>");

    client.env.set(msg.guild.id, variablesEnv);
  }

  let user_permissions = "";
  const envVariables = client.env.get(msg.guild.id);

  if (msg.member.hasPermission("ADMINISTRATOR")) user_permissions = "admin";
  else if (
    msg.member.roles.cache.find(
      (r) => r.id === envVariables.get("lieutenants").slice(3, -1)
    )
  )
    user_permissions = "lieutenants";
  else if (
    msg.member.roles.cache.find(
      (r) => r.id === envVariables.get("major").slice(3, -1)
    )
  )
    user_permissions = "major";
  else user_permissions = "membres";

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  client.commands.each((category) => {
    category.forEach((commande) => {
      if (commande.help.name === cmd) {
        for (let [key, value] of Object.entries(commande.help.permissions)) {
          if (key === user_permissions && value === true) {
            msg.delete();
            return commande.run(client, msg, args);
          }
        }
        msg.channel.send(
          `Vous n'avez pas les droits nécessaires pour exécuter la commande \`${prefix}${cmd}\` ${msg.author}`
        );
      }
    });
  });
};
