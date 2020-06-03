module.exports.run = (client, msg, args) => {
  msg.channel
    .send(`${client.user.username} est en train de redémarrer...`)
    .then(() => client.destroy())
    .then(() => client.login(client.config.token))
    .then(() => msg.channel.send(`${client.user.username} est de retour !`));
};

module.exports.help = {
  name: "restart",
  title: "Redémarrer Catsbot",
  description: "Éteint Catsbot puis le démarre à nouveau.",
  help: "Redémarrez Catsbot si vous rencontrez un soucis avec celui-ci.",
  syntaxe: "restart",
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false
  }
};
