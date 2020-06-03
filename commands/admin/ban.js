module.exports.run = (client, msg, args) => {
  let reason = new Array();
  let days = 0;
  let search_user = new Array();

  args.forEach((argument, index) => {
    if (argument.startsWith("<@!")) {
      search_user.push(
        msg.channel.members.get(argument.substring(3, argument.length - 1))
      );
    } else if (argument.startsWith("<@")) {
      search_user.push(
        msg.channel.members.get(argument.substring(2, argument.length - 1))
      );
    } else if (index + 1 === args.length && parseInt(argument, 10)) {
      days = argument;
    } else {
      reason.push(`${argument}`);
    }
  });

  search_user.forEach(user => {
    user.ban({ days: days, reason: reason.join(" ") });
    user.send(
      `Vous avez été banni du serveur ${msg.guild} par ${
        msg.author
      } pour les raisons suivantes :\n**${reason.join(" ")}**`
    );
  });

  msg.channel.send(
    `Les membres suivants ont été banni :\n${search_user.join(
      ", "
    )}\n\nCauses : **${reason.join(" ")}**`
  );
};

module.exports.help = {
  name: "ban",
  title: "Bannir un membre",
  description: "Permet de bannir un membre en le mentionnant",
  help: `Bannir un membre et effacer les messages envoyés sur le serveur jusqu'à 7 jours en entrant comme argument de la commande le nom du membre en le mentionnant, ainsi que le nombre de jours de messages à supprimer. Le message sera automatiquement supprimé, et un message d'alerte vous sera envoyé ainsi qu'au membre banni.\nExemple : \`{prefix}ban @xXmIcHeLXx Banni pour violation des codes morales du serveur. 7\` Pour le bannir et supprimer 7 jours de messages sur l'ensemble du serveur.`,
  syntaxe: "ban <membre> <raison> <durée en jours>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false
  }
};
