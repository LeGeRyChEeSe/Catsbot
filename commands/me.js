module.exports = {
  name: "me",
  description: "Renvoie le message envoyé par l'utilisateur sur le canal en tant que Catsbot",
  execute(msg, args) {
    msg.delete();
    msg.channel.send(args.join(" "));
  }
};
