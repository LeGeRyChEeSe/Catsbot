// Fonction permettant d'exécuter des commandes via le bot
// La syntaxe d'une commande est : c?<commande> <argument>
// Par exemple je veux m'ajouter le rôle test : c?role test

module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(client.PREFIXE) !== 0) return;
  const args = message.content.slice(client.PREFIXE.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) client.commands.get(command)(client, message, args);
};
