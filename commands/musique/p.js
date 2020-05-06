const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

module.exports.run = await (msg, args, client) => {
    msg.delete();
    let choix = "";
    let songInfo = null;
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

    if (!ytdl.validateURL(args.join(" "))) {
      songInfo = await ytsr(args.join(" "), { limit: 5 });

      const embed = new MessageEmbed()
        .setAuthor("Playlist")
        .setTitle(songInfo.query)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.username);

      for (let video = 0; video < 5; video++) {
        if (!songInfo.items[video]) return;
        embed.addField(
          `**${video + 1}** - ${songInfo.items[video].title}`,
          songInfo.items[video].link
        );
        if (msg.channel.client.user.lastMessage && args[0] === (video + 1).toString()) {
          choix = msg.channel.client.user.lastMessage.embeds[0].fields[video].value;
          msg.channel.client.user.lastMessage.delete();
        }
      }

      if (!choix) return msg.channel.send(embed);
    }

    if (choix === "")
      songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, "$1"));
    else songInfo = await ytdl.getInfo(choix.replace(/<(.+)>/g, "$1"));

    const song = {
      id: songInfo.video_id,
      title: songInfo.title,
      url: songInfo.video_url,
      image: songInfo.player_response.videoDetails.thumbnail.thumbnails,
      description: songInfo.description,
      title_url: songInfo.iv_invideo_url,
      author: songInfo.author,
    };
    
    console.log(serverQueue);

    if (serverQueue) {
      serverQueue.songs.push(song);
      return msg.channel.send(
        `✅🎶 **${song.title}** a été ajouté à la liste ! 🎶`
      );
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
      queue.textChannel.send(`🎶 Début de la piste: **${song.title}** 🎶`);
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
};

module.exports.help = {
  name: "p",
  description:
    "Permet de lancer une musique sur YouTube soit via un lien, soit par recherche.",
  help: `Veuillez indiquer un lien YouTube valide vers une musique, ou indiquez simplement le contenu de votre recherche YouTube de cette manière :\n\`c?p snoop dog\`
puis vous verrez apparaître une liste numérotée, tapez simplement \`c?p 1\` pour la 1ère piste de la liste, \`c?p 2\` pour la 2e, etc.`,
  syntaxe: "p <URL> ou <search>",
}
