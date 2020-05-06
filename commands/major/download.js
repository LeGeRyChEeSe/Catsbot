const { readFileSync } = require("fs");
const { MessageAttachment } = require("discord.js");

module.exports.run = (msg, args, client) => {
  msg.delete();

  if (
    !msg.member
      .permissionsIn(
        client.channels.cache.find(r => r.id === "679425098767269897")
      )
      .has(["VIEW_CHANNEL", "SEND_MESSAGES"])
  )
    return msg.channel.send("Vous n'avez pas les droits d'accès au fichier !");
  if (msg.channel.id !== "679425098767269897")
    return msg.channel.send(
      `Vous devez être dans le canal ${client.channels.cache.find(
        r => r.id === "679425098767269897"
      )}`
    );

  const getFiles = client.files;
  const file = `${args[0].toLowerCase()}.zip`;

  if (!args.length)
    return msg.channel.send(
      `Veuillez entrer la commande comme suit : \`${client.config.prefix}download <fichier>\`.\nLa liste des fichiers téléchargeables est ici :\`soon\``
    );

  if (getFiles.has(file)) {
    msg.author.send(
      "Voici la dernière mise à jour de LOyy menu (v1.1)",
      getFiles.find(r => r.name === file)
    );
    msg.channel.send(
      `Un message privé contenant le fichier va vous être envoyé ${msg.author} !`
    );
    msg.guild.members
      .resolve("440141443877830656")
      .send(`${msg.author} a téléchargé un de vos fichiers !`);
  }
};

module.exports.help = {
  name: "download",
  description: "Télécharge un fichier contenu dans le bot.",
  help: "Envoi en MP le fichier/dossier spécifié à l'utilisateur.",
  syntaxe: "download <fichier>"
};
