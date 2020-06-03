module.exports.run = (msg, args, client) => {
  let reason = new Array();
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
    } else {
      reason.push(`${argument}`);
    }
  });

  search_user.forEach(user => {
    user.kick({ reason: reason.join(" ") });
    user.send(
      `Vous avez été expulsé du serveur ${msg.guild} par ${
        msg.author
      } pour les raisons suivantes :\n**${reason.join(" ")}**`
    );
  });

  msg.channel.send(
    `Les membres suivants ont été expulsé :\n${search_user.join(
      ", "
    )}\n\nCauses : **${reason.join(" ")}**`
  );
};

module.exports.help = {
  name: "kick",
  title: "Kicker un membre",
  description: "Permet d'expulser un membre en le mentionnant",
  help:
    "Expulser un membre en entrant comme argument de la commande le nom du membre en le mentionnant. Le message sera automatiquement supprimé, et un message d'alerte vous sera envoyé ainsi qu'au membre expulsé.",
  syntaxe: "kick <membre> <raison>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false
  }
};
