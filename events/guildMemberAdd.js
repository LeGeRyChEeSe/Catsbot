// Fonction permettant de notifier l'arrivée d'un membre sur le serveur

module.exports = (client, member) => {
  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.find(r => r.name === client.BIENVENUE);
  channel.send(`Coucou ${member} Bienvenue parmis les Cats !`);
};
