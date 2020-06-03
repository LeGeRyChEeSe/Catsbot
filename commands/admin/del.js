module.exports.run = (msg, args) => {
  let nb_messages = parseInt(args, 10) + 1;
  if (nb_messages >= 100) nb_messages = 99;
  msg.channel
    .bulkDelete(nb_messages)
    .then((messages) => {
      console.log(`Vous avez supprimé ${messages.size - 1} messages.`);
      msg.channel
        .send(`Vous avez supprimé ${messages.size - 1} messages.`)
        .then((message) => message.delete({ timeout: 5000 }));
    })
    .catch(console.error);
};

module.exports.help = {
  name: "del",
  title: "Supprimer des messages",
  description: "Permet de supprimer un ou plusieurs messages d'un canal. (99 max)",
  help:
    "Indiquez le nombre de messages que vous voulez supprimer. Les messages seront supprimés du plus récent au plus ancien dans le canal où est exécuté la commande.",
  syntaxe: "del <nombre de messages>",
  permissions: {
    admin: true,
    lieutenants: true,
    major: false,
    membres: false,
  },
};
