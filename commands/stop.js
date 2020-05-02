module.exports = {
  name: "stop",
  description: "Permet d'arrêter la musique.",
  execute(msg, args, client) {
    if (!msg.member.voice.channel)
      return msg.channel.send("Connectez vous à un salon vocal !");
    if (!msg.guild.me.voice.channel)
      return msg.channel.send("Je ne suis pas connecté à un salon vocal !");
    if (msg.guild.me.voice.channelID !== msg.member.voice.channelID)
      return msg.channel.send("Vous n'êtes pas dans le même salon !");
    msg.guild.me.voice.channel.leave();
    msg.delete();
  },
};
