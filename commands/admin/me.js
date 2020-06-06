const ms = require("ms");

module.exports.run = (_client, msg, args) => {
  let autoDestruct = false;

  args.forEach((prefix, index) => {
    if (prefix === "//") {
      autoDestruct = true;
      return msg.channel
        .send(args.slice(0, index).join(" "))
        .then((message) => message.delete({ timeout: ms(args[index + 1]) }));
    }
  });

  if (!autoDestruct) msg.channel.send(args.join(" "));
};

module.exports.help = {
  name: "me",
  title: "Faire parler Catsbot",
  description:
    "Renvoi le message envoyé par l'utilisateur sur le canal en tant que Catsbot.",
  help: `Il suffit de taper la commande \`{prefix}me\` puis de taper votre texte (tous les formatages Markdown sont disponibles) pour que Catsbot écrive ce message à votre place, anonymement. Il est possible d'indiquer un paramètre d'autodestruction du message avec le préfix \`//\` suivi du temps en seconde/minutes/heures/jours pour supprimer ce message.\nExemple : \`{prefix}me Ce message s'effacera dans 3 minutes // 3m\``,
  syntaxe: "me <texte> [// <temps + unité>]",
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false,
  },
};
