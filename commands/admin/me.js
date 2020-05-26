module.exports.run = (msg, args) => {
  const indexTimeout = args.findIndex(timeout => timeout === "//") + 1;
  const Timeout = args.slice(indexTimeout);
  var valeurTemps;
  Timeout.forEach(time => {
    if (time === "j") {
      valeurTemps = Timeout[0] * 24 * 60 * 60 * 1000;
    } else if (time === "h") {
      valeurTemps = Timeout[0] * 60 * 60 * 1000;
    } else if (time === "m") {
      valeurTemps = Timeout[0] * 60 * 1000;
    } else if (time === "s") {
      valeurTemps = Timeout[0] * 1000;
    }
  })
  msg.channel.send(args.slice(0, indexTimeout - 1).join(" ")).then(message => {
    if (indexTimeout) message.delete({ timeout: valeurTemps });
  });
  msg.delete();
};

module.exports.help = {
  name: "me",
  title: "Faire parler Catsbot",
  description:
    "Renvoi le message envoyé par l'utilisateur sur le canal en tant que Catsbot. Possibilité de régler la minuterie de l'auto-destruction du message.",
  help:
    "Il suffit de taper la commande ?me puis de taper votre texte (tous les formatages Markdown sont disponibles) pour que Catsbot écrive ce message à votre place, anonymement. \n\nUtilisez \"//\" suivi d'un temps et de son unité (jours : j, heures : h, minutes : m, secondes : s) pour effacer automatiquement ce message. \n\nExemple de commande avec auto-destruction : \"?me Ce message s'effacera dans 3 secondes. // 3\"",
  syntaxe: "me <texte> [// <timeout>]",
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false
  }
};
