const { readFileSync } = require("fs");
const { MessageAttachment } = require("discord.js");

module.exports.run = (msg, args, client) => {
  msg.delete();

  const regex = /[.][a-z]*/;
  const canals = {
    modrockstar: "679425098767269897",
    vpn: "679427469228638220",
  };

  // Si l'auteur du message est dans le canal💫modsrockstar-accounts
  if (msg.channel.id === canals.modrockstar) {
    const getFiles = client.files.hacks;
    console.log(getFiles);

    if (!args.length) {
      let listeMods = [];
      const allFiles = getFiles.each((file) => {
        const afile = file.name;
        listeMods.push(`${afile.replace(regex, "")}`);
      });
      msg.channel.send(
        `La liste des fichiers téléchargeables est ici :\n\`${
          client.config.prefix
        }dl ${listeMods.join(
          "\n" + `${client.config.prefix}dl `
        )}\``
      );
    }

    const file = `${args[0].toLowerCase()}.zip`;

    if (getFiles.has(file)) {
      msg.author.send(
        `Voici la dernière mise à jour de ${args[0]}`,
        getFiles.find((r) => r.name === file)
      );
      msg.channel.send(
        `Un message privé contenant le fichier ${file} va vous être envoyé ${msg.author} !`
      );
      return msg.guild.members
        .resolve("440141443877830656")
        .send(`${msg.author} a téléchargé ${file} !`);
    }
  }

  // Si l'auteur du message est dans le canal💫vpn
  if (msg.channel.id === canals.vpn) {
    const getFiles = client.files.vpn;
    if (!args.length) {
      let listeVPNs = [];
      const allFiles = getFiles.each((file) => {
        const afile = file.name;
        listeVPNs.push(`${afile.replace(regex, "")}`);
      });
      msg.channel.send(
        `La liste des fichiers téléchargeables est ici :\n\`${
          client.config.prefix
        }dl ${listeVPNs.join(
          "\n" + `${client.config.prefix}dl `
        )}\``
      );
    }

    const file = `${args[0].toLowerCase()}.zip`;

    if (getFiles.has(file)) {
      msg.author.send(
        `Voici la dernière mise à jour de ${args[0]}`,
        getFiles.find((r) => r.name === file)
      );
      msg.channel.send(
        `Un message privé contenant le fichier ${file} va vous être envoyé ${msg.author} !`
      );
      return msg.guild.members
        .resolve("440141443877830656")
        .send(`${msg.author} a téléchargé ${file} !`);
    }
  }

  // Si l'auteur du message est dans aucun des canals nécessaires au téléchargement
  if (!Object.values(canals).find((r) => r === msg.channel.id)) {
    let canals_on = new Object();

    for (const canal in canals) {
      if (
        msg.member
          .permissionsIn(
            client.channels.cache.find((r) => r.id === canals[canal])
          )
          .has(["VIEW_CHANNEL", "SEND_MESSAGES"])
      )
        canals_on[canal] = client.channels.cache.find(
          (r) => r.id === canals[canal]
        );
    }

    msg.author.send(
      `Vous devez être dans l'un des canals textuels suivants pour pouvoir exécuter la commande \`${
        client.config.prefix
      }dl\` :\n${Object.values(canals_on).join("\n")}`
    );
  }
};

module.exports.help = {
  name: "dl",
  title: "Télécharger un fichier",
  description: "Télécharge un fichier contenu dans le bot.",
  help: "Envoi en MP le fichier/dossier spécifié à l'utilisateur.",
  syntaxe: "dl <fichier>",
  permissions: {
    "admin": true,
    "lieutenants": true,
    "major": true,
    "membres": false
  }
};
