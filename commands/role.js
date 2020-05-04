module.exports = {
  name: "role",
  description:
    "Permet de s'attribuer un rôle ou de le retirer si on a déjà ce rôle.",
  help:
    "Un membre peut s'attribuer un rôle auquel il a les droits d'attribution.",
  syntaxe: "role <role>",
  execute(msg, args, client) {
    const role = msg.guild.roles.cache.find((r) => r.name === args[0]);
    if (!role) return msg.channel.send(`Le rôle ${args[0]} n'existe pas !`);

    const channel = client.channels.cache.find(
      (r) => r.name === "test-catsbot"
    );
    if (msg.member.roles.cache.find((r) => r.name === args[0])) {
      msg.member.roles.remove(role);
      msg.delete();
      channel.send(`Le rôle ${role} a été retiré de ${msg.author}`);
    } else {
      msg.member.roles.add(role);
      msg.delete();
      channel.send(`Le rôle ${role} a été ajouté à ${msg.author}`);
    }
  },
};
