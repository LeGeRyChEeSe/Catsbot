const { readdirSync, readFileSync, readFile } = require("fs");
const { Collection, MessageAttachment } = require("discord.js");
const MusicClient = require("./assets/struct/Client");
const client = new MusicClient({
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  bienvenue: process.env.BIENVENUE
});
client.files = new Collection();
let nouveau_membre = "";

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
    }
  });
};

const loadFiles = (dir = "./assets/downloads/hacks/") => {
  readdirSync(dir).forEach(dirfiles => {
    const commands = readdirSync(`${dir}/`).filter(files =>
      files.endsWith(".zip")
    );

    for (const file of commands) {
      const buffer = readFileSync(`${dir}/${file}`);
      const attachment = new MessageAttachment(buffer, file);
      client.files.set(attachment.name, attachment);
    }
  });
};

function loadMessages(dir = "./assets/struct/") {
  let random = 0;
  const message_onadd = readdirSync(dir).filter(file => file.endsWith(".json"));
  readFile(`${dir}/${message_onadd}`, (error, message_onadd) => {
    const messages = JSON.parse(message_onadd);

    for (const message in messages) {
      random++;
    }
    const message_alea = Math.floor(Math.random() * random) + 1;

    for (const message in messages) {
      if (message_alea.toString() === message) {
        nouveau_membre = messages[message];
      }
    }
    console.log(nouveau_membre);
  });
}

loadCommands();
loadFiles();

client.on("message", async msg => {
  // Fonction permettant d'exécuter des commandes via le bot
  // La syntaxe d'une commande est : c?<commande> <argument>
  // Par exemple je veux m'ajouter le rôle test : c?role test

  if (
    !msg.content.toLowerCase().startsWith(client.config.prefix) ||
    msg.author.bot
  )
    return;
  const args = msg.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd))
    return console.log(`La commande ${msg.content} n'existe pas.`);
  client.commands.get(cmd).run(msg, args, client);
});

client.on("guildMemberAdd", member => {
  // Fonction permettant de notifier l'arrivée d'un membre sur le serveur
  
  loadMessages();

  member.send(`Hey ${member.displayName}, bienvenue sur World War Of Cats :tada::smirk_cat: ! 

Pour des raisons de sécurité, merci d'indiquer ton pseudo via GTA, merkiii !
**:point_right: Sans réponses de ta part dans les 48h, nous serons contraint de t'expulser de notre serveur, merci d'avance pour ta compréhension.**

Hey ${member.displayName}, welcome to World War Of Cats :tada::smirk_cat: !

For security reasons, thanks to write here your GTA nickname ty!
**:point_right:  Without answers from you within 48 hours, we'll be forced to expel you from our server, thank you in advance for your understanding.**`);
  const channel = client.channels.cache.find(
    r => r.name === client.config.bienvenue
  );
  channel.send(nouveau_membre);
});

client.on("guildMemberRemove", member => {
  // Fonction permettant de notifier le départ d'un membre du serveur

  member.send(
    "J'espère que tu as passé un bon moment avec nous au moins... Sniff :sob:"
  );
  const channel = client.channels.cache.find(
    r => r.name === client.config.bienvenue
  );
  channel.send(
    `Bye bye ${member.displayName}, j'espère que tu seras heureux dans ta nouvelle vie :slight_smile:`
  );
});

client.login(client.config.token);

client.on("ready", () => {
  console.log("Je suis prêt !");
});

client.on("error", console.error);
client.on("warn", console.warn);
