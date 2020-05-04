const fs = require("fs");
const { Collection } = require("discord.js");
const MusicClient = require("./assets/struct/Client");
const client = new MusicClient({
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  bienvenue: process.env.BIENVENUE
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async msg => {
  // Fonction permettant d'exécuter des commandes via le bot
  // La syntaxe d'une commande est : c?<commande> <argument>
  // Par exemple je veux m'ajouter le rôle test : c?role test

  if (!msg.content.toLowerCase().startsWith(client.config.prefix) || msg.author.bot) return;
  const args = msg.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd)) return;
  client.commands.get(cmd).execute(msg, args, client);
});

/*
client.on("guildMemberAdd", member => {
  // Fonction permettant de notifier l'arrivée d'un membre sur le serveur

  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.find(
    r => r.name === client.config.bienvenue
  );
  channel.send(`Coucou ${member} Bienvenue parmis les Cats !`);
});
*/

client.on("guildMemberRemove", member => {
  // Fonction permettant de notifier le départ d'un membre du serveur

  member.send(
    "J'espère que tu as passé un bon moment avec nous au moins... Sniff :sob:"
  );
  const channel = client.channels.cache.find(
    r => r.name === client.config.bienvenue
  );
  channel.send(
    `Bye bye ${member}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`
  );
});

client.login(client.config.token);

client.on("ready", () => {
  console.log("Je suis prêt !");
});

client.on("error", console.error);
client.on("warn", console.warn);
