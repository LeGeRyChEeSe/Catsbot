module.exports = (member) => {
  // Fonction permettant de notifier le départ d'un membre du serveur

  const channel = client.channels.cache.find(
    (r) => r.id === client.env.get(member.guild.id).get("welcome").slice(2, -1)
  );

  channel.send(`${member.displayName} nous a quitté !`);
};
