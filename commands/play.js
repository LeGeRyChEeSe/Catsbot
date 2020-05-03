const { Util } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Permet de lancer une musique sur YouTube via un lien",
  async execute(msg, args) {
    const { channel } = msg.member.voice;
    if (!channel)
      return msg.channel.send(
        "Vous devez être dans le canal pour jouer de la musique !"
      );
    const permissions = channel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT"))
      return msg.channel.send(
        "Je n'ai pas la permission de me connecter à ton canal."
      );
    if (!permissions.has("SPEAK"))
      return msg.channel.send(
        "Je n'ai pas la permission de parler dans ce canal."
      );

    const serverQueue = msg.client.queue.get(msg.guild.id);
    const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, "$1"));
    const song = {
      id: songInfo.video_id,
      title: Util.escapeMarkdown(songInfo.title),
      url: songInfo.video_url,
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return msg.channel.send(`✅ **${song.title}** a été ajouté à la liste !`);
    }

    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };
    msg.client.queue.set(msg.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = msg.client.queue.get(msg.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        msg.client.queue.delete(msg.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`🎶 Début de la piste: **${song.title}**`);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Je ne peux pas rejoindre le canal: ${error}`);
      msg.client.queue.delete(msg.guild.id);
      await channel.leave();
      return msg.channel.send(`Je ne peux pas rejoindre le canal: ${error}`);
    }
  },
};
