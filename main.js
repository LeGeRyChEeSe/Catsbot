const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableMentions: "everyone" });

client.on("message", msg => {
  if (msg.author.bot) return;
  const args = msg.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === `${PREFIX}coucou`) msg.channel.send(`Coucou c'est moi, ${client.user.username} !`);
});

client.on("guildMemberAdd", member => {
  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.get("705785446923370508");
  channel.send(`Coucou ${member} bienvenue parmis les Cats !`);
});

client.login(TOKEN);

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
