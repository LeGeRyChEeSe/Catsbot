// Fonction permettant de notifier le départ d'un membre du serveur

module.exports = (client, member) => {
  member.send(
    "J'espère que tu as passé un bon moment avec nous au moins... Sniff :sob:"
  );
  const channel = client.channels.cache.find(r => r.name === client.BIENVENUE);
  channel.send(`Bye bye ${member}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`);
};
