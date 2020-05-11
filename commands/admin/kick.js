module.exports.run = (msg, args, client) => {
  const channel = msg.channel.id;
  const argument = [];
  let search_user = [];
  for (let mention = 0; mention < args.length; mention++) {
    const user = args[mention];
    if (args[mention].startsWith("<@!")) {
      search_user.push(
        msg.channel.members.get(user.substring(3, user.length - 1))
      );
    } else if (args[mention].startsWith("<@")) {
      search_user.push(
        msg.channel.members.get(user.substring(2, user.length - 1))
      );
    } else {
      argument.push(`**${args[mention]}**`);
    }
  }
  
  for (const user of search_user) {
    user.kick(argument.join(" "));
    user.send(`Vous avez été kick par ${msg.author} vous les raisons suivantes : ${argument.join(" ")}`);
  }
  
  msg.channel.send(`Le(s) membre(s) suivants ont été expulsés :\n${search_user.join("\n")}\n\n**Cause(s) :** ${argument.join(" ")}`);
  msg.delete();
};

module.exports.help = {
  name: "kick",
  title: "Kicker un membre",
  description: "Permet d'expulser un membre en le mentionnant",
  help:
    "Expulser un membre en entrant comme argument de la commande le nom du membre en le mentionnant. Le message sera automatiquement supprimé, et un message d'alerte vous sera envoyé ainsi qu'au membre expulsé.",
  syntaxe: "kick <membre>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false
  }
};
