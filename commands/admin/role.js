module.exports.run = (client, msg, args) => {
  const role = msg.guild.roles.cache.find((r) => r.name === args[0]);
  if (!role) return msg.channel.send(`Le rôle ${args[0]} n'existe pas !`);

  const channel = client.channels.cache.find((r) => r.name === "test-catsbot");
  if (msg.member.roles.cache.find((r) => r.name === args[0])) {
    msg.member.roles.remove(role);
    channel.send(`Le rôle ${role} a été retiré de ${msg.author}`);
  } else {
    msg.member.roles.add(role);
    channel.send(`Le rôle ${role} a été ajouté à ${msg.author}`);
  }
};

module.exports.help = {
  name: "role",
  title: "S'assigner un rôle",
  description:
    "Permet de s'attribuer un rôle ou de le retirer si on a déjà ce rôle.",
  help:
    "Un membre peut s'attribuer un rôle auquel il a les droits d'attribution.",
  syntaxe: "role <role>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
