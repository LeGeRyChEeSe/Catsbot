const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Permet de lancer une musique sur YouTube via un lien",
  async execute(msg, args) {
    if (!msg.member.voice.channel)
      return msg.channel.send("Connectez vous à un salon vocal !");
    if (msg.guild.me.voice.channel)
      return msg.channel.send("Je ne suis pas connecté à un salon vocal !");
    if (!args[0]) return msg.channel.send("Merci de préciser un lien YouTube");
    
    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play('./assets/musique/musique.mp3');
      
    
    //const dispatcher = connection.play(ytdl(args[0], { filter: 'audioonly' }));
    //msg.channel.send("Chanson ajoutée.");
    }
  }
    