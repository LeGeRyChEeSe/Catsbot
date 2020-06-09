module.exports.run = (client, msg, args) => {
  const guild = client.env.get(msg.guild.id);

  const regex = /[.][a-z]*/;
  const canals = {
    modcanal: guild.get("modcanal").slice(2, -1),
    vpncanal: guild.get("vpncanal").slice(2, -1),
  };

  // Si l'auteur du message est dans le canal modcanal
  if (msg.channel.id === canals.modcanal) {
    const getFiles = client.files.hacks;

    if (!args.length) {
      let listeMods = [];
      const allFiles = getFiles.each((file) => {
        const afile = file.name;
        listeMods.push(`${afile.replace(regex, "")}`);
      });
      return msg.channel.send(
        `La liste des fichiers téléchargeables est ici :\n\`${guild.get(
          "prefix"
        )}dl ${listeMods.join("\n" + `${guild.get("prefix")}dl `)}\``
      );
    }

    const file = `${args[0].toLowerCase()}.zip`;

    if (getFiles.has(file)) {
      msg.author.send(
        `Voici la dernière mise à jour de ${args[0]}`,
        getFiles.find((r) => r.name === file)
      );
      msg.channel
        .send(
          `Un message privé contenant le fichier ${file} va vous être envoyé ${msg.author} !`
        )
        .then((message) => message.delete({ timeout: 5000 }));
      return msg.guild.members
        .resolve(guild.get("logUser"))
        .send(`${msg.author} a téléchargé ${file} !`);
    }
  }

  // Si l'auteur du message est dans le canal vpncanal
  if (msg.channel.id === canals.vpncanal) {
    const getFiles = client.files.vpn;

    if (!args.length) {
      let listeVPNs = [];
      const allFiles = getFiles.each((file) => {
        const afile = file.name;
        listeVPNs.push(`${afile.replace(regex, "")}`);
      });
      return msg.channel.send(
        `La liste des fichiers téléchargeables est ici :\n\`${guild.get(
          "prefix"
        )}dl ${listeVPNs.join("\n" + `${guild.get("prefix")}dl `)}\``
      );
    }

    const file = `${args[0].toLowerCase()}.zip`;

    if (getFiles.has(file)) {
      msg.author.send(
        `Voici la dernière mise à jour de ${args[0]}`,
        getFiles.find((r) => r.name === file)
      );
      msg.channel
        .send(
          `Un message privé contenant le fichier ${file} va vous être envoyé ${msg.author} !`
        )
        .then((message) => message.delete({ timeout: 5000 }));
      return msg.guild.members
        .resolve(guild.get("logUser"))
        .send(`${msg.author} a téléchargé ${file} !`);
    }
  }

  // Si l'auteur du message est dans aucun des canals nécessaires au téléchargement
  if (!Object.values(canals).find((r) => r === msg.channel.id)) {
    let canals_on = new Object();

    for (const canal in canals) {
      if (isNaN(canals[canal])) {
        msg.channel.send(
          `La variable d'environnement \`${canal}\` n'est pas spécifiée. Tapez \`${guild.get(
            "prefix"
          )}cfg\` pour plus d'informations (nécessite droits Admins).`
        );
        continue;
      }

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
      `Vous devez être dans l'un des canals textuels suivants pour pouvoir exécuter la commande \`${guild.get(
        "prefix"
      )}dl\` :\n${Object.values(canals_on).join("\n")}`
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
    admin: true,
    lieutenants: true,
    major: true,
    membres: false,
  },
};
