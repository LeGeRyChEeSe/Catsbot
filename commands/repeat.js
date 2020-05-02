// Commande pour que le bot répète ce qu'on écrit

module.exports = (client, message, args) => {
  message.delete();
  message.channel.send(args.join(" "));
};
