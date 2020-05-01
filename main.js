const { Client } = require("discord.js");
const { TOKEN, PREFIX, AIRPORT } = require("./config");
const client = new Client({ disableMentions: "everyone" });

client.on("message", msg => {
  if (msg.author.bot) return;
  const args = msg.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === `${PREFIX}coucou`) msg.channel.send(`Coucou c'est moi, ${client.user.username} !`);
});

client.on("guildMemberAdd", member => {
  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.get(AIRPORT);
  channel.send(`Coucou ${member} Bienvenue parmis les Cats !`);
});

client.on("guildMemberRemove", member => {
  member.send("J'espère que tu as passé un bon moment avec nous au moins... Sniff :'(");
  const channel = client.channels.cache.get(AIRPORT);
  channel.send(`Bye bye ${member}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`);
});

client.login(TOKEN);

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
