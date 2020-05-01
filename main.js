const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableMentions: "everyone" });

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(PREFIX) !== 0) return;
  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === "coucou") msg.channel.send(`Coucou c'est moi, ${client.user.username} !`);
  if (cmd === "repeat") {
    msg.delete();
    msg.channel.send(args.join(" "));
  }
  if (cmd === "role") {
    const role = msg.guild.roles.cache.find(r => r.name === args[0]);
    if (!role) return msg.channel.send(`Le rôle ${args[0]} n'existe pas !`);
    const channel = client.channels.cache.find(r => r.name === "logs");
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
});

client.on("guildMemberAdd", member => {
  member.send("Bienvenue parmis les Cats !");
  const channel = client.channels.cache.find(r => r.name === "bienvenue");
  channel.send(`Coucou ${member} Bienvenue parmis les Cats !`);
});

client.on("guildMemberRemove", member => {
  member.send("J'espère que tu as passé un bon moment avec nous au moins... Sniff :'(");
  const channel = client.channels.cache.find(r => r.name === "bienvenue");
  channel.send(`Bye bye ${member}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`);
});

client.login(TOKEN);

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
