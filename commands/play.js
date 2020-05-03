const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Permet de lancer une musique sur YouTube via un lien",
  execute(msg, args) {
    if (!msg.member.voice.channel)
      return msg.channel.send("Connectez vous à un salon vocal !");
    if (msg.guild.me.voice.channel)
      return msg.channel.send("Je ne suis pas connecté à un salon vocal !");
    if (!args[0]) return msg.channel.send("Merci de préciser un lien YouTube");

    const validate = await ytdl.validateURL(args[0]);
    if (!validate) return msg.channel.send("Désolé, l'URL n'est pas valide !");

    const info = await ytdl.getInfo(args[0]);
    const connection = await msg.member.voice.channel.join();
    await connection.play(
      ytdl(args[0], { filter: "audioonly" }, { quality: "highestaudio" })
    );
    msg.channel.send(`Musique ajoutée : ${info.getInfo}`);
  },
};
