const { readdirSync, readFileSync, readFile, writeFile } = require("fs");
const { Collection, MessageAttachment } = require("discord.js");
const MusicClient = require("./assets/struct/Client");
const client = new MusicClient({
  token: process.env.TOKEN,
});
client.files = new Collection();
client.files.hacks = new Collection();
client.files.vpn = new Collection();
client.env = new Collection();

let nouveau_membre = "";

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
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
  readdirSync(dir).forEach((dirs) => {
    const files = readdirSync(`${dir}/${dirs}`).filter((files) =>
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
  const message_onadd = readdirSync(dir).filter((file) =>
    file.endsWith(".json")
  );
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

function loadEnvVariables(JSONsave = require("./assets/struct/config.json")) {
  JSONsave.forEach((object) => {
    const envVariables = object.envVariables;
    const variablesEnv = new Collection();

    variablesEnv.set("prefix", envVariables.prefix);
    variablesEnv.set("welcome", envVariables.welcome);
    variablesEnv.set("modcanal", envVariables.modcanal);
    variablesEnv.set("vpncanal", envVariables.vpncanal);
    variablesEnv.set("logUser", envVariables.logUser);
    variablesEnv.set("lieutenants", envVariables.lieutenants);
    variablesEnv.set("major", envVariables.major);

    client.env.set(object.guildID, variablesEnv);
  });
}

const loadEvents = (dir = "./events/") => {
  readdirSync(dir).forEach((dirs) => {
    const events = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
    }
  });
};

loadCommands();
loadFiles();
loadEnvVariables();
loadEvents();

client.on("message", async (msg) => {});

client.on("guildMemberAdd", (member) => {
  // Fonction permettant de notifier l'arrivée d'un membre sur le serveur

  //loadMessages();

  member.send(`Hey ${member.displayName}, bienvenue sur World War Of Cats :tada::smirk_cat: ! 

Pour des raisons de sécurité, merci d'indiquer ton pseudo via GTA, merkiii !
**:point_right: Sans réponses de ta part dans les 48h, nous serons contraint de t'expulser de notre serveur, merci d'avance pour ta compréhension.**

Hey ${member.displayName}, welcome to World War Of Cats :tada::smirk_cat: !

For security reasons, thanks to write here your GTA nickname ty!
**:point_right:  Without answers from you within 48 hours, we'll be forced to expel you from our server, thank you in advance for your understanding.**`);
  const channel = client.channels.cache.find(
    (r) =>
      r.name === client.env.get(member.guild.id).get("welcome").slice(2, -1)
  );
  //channel.send(nouveau_membre);
});

client.on("guildMemberRemove", (member) => {
  // Fonction permettant de notifier le départ d'un membre du serveur

  const channel = client.channels.cache.find(
    (r) => r.id === client.env.get(member.guild.id).get("welcome").slice(2, -1)
  );

  channel.send(`${member.displayName} nous a quitté !`);
});

client.login(client.config.token);

client.on("ready", () => {});

client.on("error", console.error);
client.on("warn", console.warn);
