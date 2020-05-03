module.exports = {
  name: "me",
  description:
    "Renvoie le message envoyé par l'utilisateur sur le canal en tant que Catsbot",
  help:
    "Il suffit de taper la commande c?me puis de taper votre texte (tous les formatages Markdown sont disponibles) pour que Catsbot écrive ce message à votre place, anonymement.",
  syntaxe: "c?me <texte>",
  execute(msg, args) {
    msg.delete();
    msg.channel.send(args.join(" "));
  }
};
