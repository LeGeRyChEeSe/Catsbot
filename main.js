const { readdirSync, readFileSync, readFile, writeFile } = require("fs");
const { Collection, MessageAttachment } = require("discord.js");
const MusicClient = require("./assets/struct/Client");
const client = new MusicClient({
  token: process.env.TOKEN
});
client.files = new Collection();
client.files.hacks = new Collection();
client.files.vpn = new Collection();
client.env = new Collection();

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

function loadEnvVariables(JSONsave = require("./assets/struct/config.json")) {
  JSONsave.forEach(object => {
    const envVariables = object.envVariables;
    const variablesEnv = new Collection();

    // Pour ajouter une variable d'environnement il est nécessaire de l'ajouter ci-après,
    // dans le fichier ./events/client/message.js
    // et dans le fichier ./commands/admin/cfg.js

    variablesEnv.set("prefix", envVariables.prefix || `?`);
    variablesEnv.set(
      "welcome",
      envVariables.welcome || `<Put Channel ID here>`
    );
    variablesEnv.set(
      "modcanal",
      envVariables.modcanal || `<Put Channel ID here>`
    );
    variablesEnv.set(
      "vpncanal",
      envVariables.vpncanal || `<Put Channel ID here>`
    );
    variablesEnv.set(
      "logcanal",
      envVariables.logcanal || `<Put Channel ID here>`
    );
    variablesEnv.set("logUser", envVariables.logUser || `<Put User ID here>`);
    variablesEnv.set(
      "lieutenants",
      envVariables.lieutenants || `<Put Role ID here>`
    );
    variablesEnv.set("major", envVariables.major || `<Put Role ID here>`);
    variablesEnv.set("muterole", envVariables.muterole || `<Put Role ID here>`);

    client.env.set(object.guildID, variablesEnv);
  });
}

const loadEvents = (dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files =>
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

client.login(client.config.token);
