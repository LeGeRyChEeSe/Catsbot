module.exports.run = (msg, args) => {
  msg.channel.send(args.join(" "));
  msg.delete({ timeout: 5 });
};

module.exports.help = {
  name: "me",
  description:
    "Renvoi le message envoyé par l'utilisateur sur le canal en tant que Catsbot",
  help:
    "Il suffit de taper la commande c?me puis de taper votre texte (tous les formatages Markdown sont disponibles) pour que Catsbot écrive ce message à votre place, anonymement.",
  syntaxe: "me <texte>",
};
