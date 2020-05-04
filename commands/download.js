const fs = require("fs");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "download",
  description: "Télécharge un fichier contenu dans le bot.",
  help: "Envoi en MP le fichier/dossier spécifié à l'utilisateur.",
  syntaxe: "download <fichier>",
  execute(msg, args, client) {
    if (
      !msg.member
        .permissionsIn(
          client.channels.cache.find(r => r.id === "679425098767269897")
        )
        .has(["VIEW_CHANNEL", "SEND_MESSAGES"])
    )
      return msg.channel.send(
        "Vous n'avez pas les droits d'accès au fichier !"
      );
    if (msg.channel.id !== "679425098767269897")
      return msg.channel.send(
        `Vous devez être dans le canal #${client.channels.cache.find(
          r => r.id === "679425098767269897"
        )}`
      );

    if (args[0].toLowerCase() === "loyy") {
      const buffer = fs.readFileSync("./assets/downloads/hacks/loyy.zip");
      const attachment = new MessageAttachment(buffer, "loyy.zip");
      msg.author.send(
        "Voici la dernière mise à jour de LOyy menu (v1.1)",
        attachment
      );
    }
    msg.channel.send(
      `Un message privé contenant le fichier vous a été envoyé ${msg.author}`
    );
    msg.delete();
  }
};
