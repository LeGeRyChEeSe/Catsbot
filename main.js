const { readdirSync, readFileSync, readFile } = require("fs");
const { Collection, MessageAttachment } = require("discord.js");
const MusicClient = require("./assets/struct/Client");
const client = new MusicClient({
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  bienvenue: process.env.BIENVENUE
});
client.files = new Collection();
client.files.hacks = new Collection();
client.files.vpn = new Collection();
let nouveau_membre = "";

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files =>
      files.endsWith(".js")
    );
    let commandes = new Array();

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      commandes.push(getFileName);
    }
    client.commands.set(dirs, commandes);
  });
};

const loadFiles = (dir = "./assets/downloads/") => {
  readdirSync(dir).forEach(dirs => {
    const files = readdirSync(`${dir}/${dirs}`).filter(files =>
      files.endsWith(".zip")
    );

    for (const file of files) {
      if (dirs === "hacks") {
        const buffer = readFileSync(`${dir}/${dirs}/${file}`);
        const attachment = new MessageAttachment(buffer, file);
        client.files.hacks.set(attachment.name, attachment);
      } else if (dirs === "vpn") {
        const buffer = readFileSync(`${dir}/${dirs}/${file}`);
        const attachment = new MessageAttachment(buffer, file);
        client.files.vpn.set(attachment.name, attachment);
      }
    }
  });
};

function loadMessages(dir = "./assets/struct/") {
  let random = 0;
  const message_onadd = readdirSync(dir).filter(file => file.endsWith(".json"));
  readFile(`${dir}/${message_onadd}`, (error, message_onadd) => {
    const messages = JSON.parse(message_onadd);

    for (const {} in messages) {
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

  let user_permissions = "";

  if (msg.member.hasPermission("ADMINISTRATOR")) user_permissions = "admin";
  else if (msg.member.roles.cache.find(r => r.id === "642256556402016256"))
    user_permissions = "lieutenants";
  else if (msg.member.roles.cache.find(r => r.id === "692058184893857792"))
    user_permissions = "major";
  else user_permissions = "membres";

  const args = msg.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  client.commands.each(category => {
    category.forEach(commande => {
      if (commande.help.name === cmd) {
        for (let [key, value] of Object.entries(commande.help.permissions)) {
          if (key === user_permissions && value === true)
            return commande.run(msg, args, client);
        }
        return msg.channel.send(
          `Vous n'avez pas les droits pour exécuter la commande \`${client.config.prefix}${cmd}\``
        );
      }
    });
  });
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
  client.user.setActivity("chat | ?help");
  console.log("Je suis prêt !");
});

client.on("error", console.error);
client.on("warn", console.warn);
