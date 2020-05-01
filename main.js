const { Client } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const client = new Client({ disableMentions: "everyone" });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.startsWith(`${PREFIX}coucou`)) msg.channel.send(`Coucou c'est moi, ${client.user.username} !`);
});

client.login(TOKEN);
