const { Client } = require("discord.js");
const { TOKEN, PREFIX, BIENVENUE } = require("./config");
const client = new Client({ disableMentions: "everyone" });

client.on("message", msg => {
// Fonction permettant d'exécuter des commandes via le bot
// La syntaxe d'une commande est : c?<commande> <argument>
// Par exemple je veux m'ajouter le rôle test : c?role test

  if (msg.author.bot) return;
  if (msg.content.indexOf(PREFIX) !== 0) return;

  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "me") {
    // Commande pour que le bot répète ce qu'on écrit
    
    msg.delete();
    msg.channel.send(args.join(" "));

  }

  if (cmd === "role") {
    // Commande pour s'ajouter soi-même un rôle

    const role = msg.guild.roles.cache.find(r => r.name === args[0]);
    if (!role) return msg.channel.send(`Le rôle ${args[0]} n'existe pas !`);

    const channel = client.channels.cache.find(r => r.name === "test-catsbot");
    if (msg.member.roles.cache.find(r => r.name === args[0])) {

      msg.member.roles.remove(role);
      msg.delete();
      channel.send(`Le rôle ${role} a été retiré de ${msg.author}`);

    } else {

      msg.member.roles.add(role);
      msg.delete();
      channel.send(`Le rôle ${role} a été ajouté à ${msg.author}`);

    }
  }

  if (cmd === "mp") {
    const channel = msg.channel.name;
    for (let mention = 0; mention < args.length; mention++) {
      if (args[mention].startsWith("<@!")) {
        const user = args[mention];
        const search_user = msg.channel.members.get(user.substring(3, user.length - 1));
        msg.delete();
        msg.channel.send(`${search_user} est demandé dans le canal **${channel}**`);
        search_user.send(`Hello ${search_user} ! ${msg.author} te réclame sur le serveur __**${msg.guild.name}**__ dans le canal **${channel}** !`);
      }
    }
  }

});

client.on("guildMemberAdd", member => {
// Fonction permettant de notifier l'arrivée d'un membre sur le serveur

  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.find(r => r.name === BIENVENUE);
  channel.send(`Coucou ${member} Bienvenue parmis les Cats !`);

});

client.on("guildMemberRemove", member => {
// Fonction permettant de notifier le départ d'un membre du serveur

  member.send("J'espère que tu as passé un bon moment avec nous au moins... Sniff :sob:");
  const channel = client.channels.cache.find(r => r.name === BIENVENUE);
  channel.send(`Bye bye ${member}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`);

});

client.login(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(r => r.name === "test-catsbot");
  channel.send(`:green_circle: ${client.user.username} est connecté !`);
});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
