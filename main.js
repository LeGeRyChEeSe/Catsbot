const { Client } = require('discord.js');
const client = new Client({ disableMentions: "everyone" });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content === 'coucou catsbot') msg.channel.send(`Coucou c'est moi, ${client.user.username} !`);
  if (msg.content === 'everyone') msg.channel.send("@everyone", { disableMentions: "none" });
  if (msg.content === 'noteveryone') msg.channel.send("@everyone, but not");
});

client.login('Placeholder');