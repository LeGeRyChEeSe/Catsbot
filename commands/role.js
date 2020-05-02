// Commande pour s'ajouter soi-même un rôle

module.exports = (client, message, args) => {
  const role = message.guild.roles.cache.find(r => r.name === args[0]);
  if (!role) return message.channel.send(`Le rôle ${args[0]} n'existe pas !`);

  const channel = client.channels.cache.find(r => r.name === "logs");
  if (message.member.roles.cache.find(r => r.name === args[0])) {
    message.member.roles.remove(role);
    message.delete();
    channel.send(`Le rôle ${role} a été retiré de ${message.author}`);
  } else {
    message.member.roles.add(role);
    message.delete();
    channel.send(`Le rôle ${role} a été ajouté à ${message.author}`);
  }
};
