const fs = require("fs");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "download",
  description: "Télécharge un fichier contenu dans le bot.",
  help: "Envoie en MP le fichier/dossier spécifié à l'utilisateur.",
  syntaxe: "download <fichier>",
  execute(msg, args) {
    const buffer = fs.readFileSync("./assets/downloads/hacks/loyy.zip");
    const attachment = new MessageAttachment(buffer, "loyy.zip");
    msg.author.send(
      "Voici la dernière mise à jour de LOyy menu (v1.1)",
      attachment
    );
  },
};
