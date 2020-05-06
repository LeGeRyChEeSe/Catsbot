const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

module.exports.run = async (msg, args, client) => {
  let choix = [];
  let songInfo = null;
  let message = null;
  let song = new Array();
  const serverQueue = msg.client.queue.get(msg.guild.id);
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

  // Condition si l'argument de la commande est autre chose qu'un lien YouTube
  if (!ytdl.validateURL(args.join(" "))) {
    // Condition permettant de choisir un lien parmis les choix précédent
    if (msg.channel.client.user.lastMessage) {
      if (msg.channel.client.user.lastMessage.embeds[0])
        for (let arg = 0; arg < args.length; arg++) {
          for (let video = 1; video <= 5; video++) {
            if (args[arg] === video.toString()) {
              choix.push(
                msg.channel.client.user.lastMessage.embeds[0].fields[video - 1]
                  .value
              );
            }
          }
        }
    }

    for (let arg = 0; arg < choix.length; arg++) {
      songInfo = await ytdl.getInfo(choix[arg].replace(/<(.+)>/g, "$1"));
      song.push({
        id: songInfo.video_id,
        title: songInfo.title,
        url: songInfo.video_url,
        image: songInfo.player_response.videoDetails.thumbnail.thumbnails,
        description: songInfo.description,
        title_url: songInfo.iv_invideo_url,
        author: songInfo.author
      });
      serverQueue.songs.push(song[arg]);
    }
  }

  if (!choix.length) {
    songInfo = await ytsr(args.join(" "), { limit: 5 });

    let embed = new MessageEmbed()
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
    }
    msg.channel.send(embed);
  }

  if (ytdl.validateURL(args.join(" "))) {
    songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, "$1"));

    song.push({
      id: songInfo.video_id,
      title: songInfo.title,
      url: songInfo.video_url,
      image: songInfo.player_response.videoDetails.thumbnail.thumbnails,
      description: songInfo.description,
      title_url: songInfo.iv_invideo_url,
      author: songInfo.author
    });
    serverQueue.songs.push(song[0]);
  }

  if (serverQueue) {
    for (let arg = 0; arg < args.length; arg++) {
      serverQueue.songs.push(song[arg]);
      msg.channel.send(
        `✅🎶 **${song[arg].title}** a été ajouté à la liste ! 🎶`
      );
    }
    /*
      for (let song = 0; song < serverQueue.songs.length; song++)
        queueConstruct.songs.push(serverQueue.songs[song]);
      queueConstruct.playing = serverQueue.playing; */
  }

  const queueConstruct = {
    textChannel: msg.channel,
    voiceChannel: channel,
    connection: null,
    songs: [],
    volume: 2,
    playing: false
  };
  msg.client.queue.set(msg.guild.id, queueConstruct);

  if (!serverQueue) return;

  queueConstruct.playing = true;

  queueConstruct.songs.push(serverQueue.songs.values());
  for (const arg of queueConstruct.songs) console.log(arg);

  const play = async song => {
    const queue = msg.client.queue.get(msg.guild.id);
    if (!queueConstruct.playing) return;
    if (!song) {
      queue.voiceChannel.leave();
      msg.client.queue.delete(msg.guild.id);
      return;
    }

    const dispatcher = queue.connection
      .play(ytdl(queue.songs[0].url))
      .on("finish", () => {
        queue.songs.shift();
        play(queue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    queue.textChannel.send(
      `🎶 Début de la piste: **${queue.songs[0].title}** 🎶`
    );
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
  name: "pp",
  description:
    "Permet de lancer une musique sur YouTube soit via un lien, soit par recherche.",
  help: `Veuillez indiquer un lien YouTube valide vers une musique, ou indiquez simplement le contenu de votre recherche YouTube de cette manière :\n\`c?p snoop dog\`
puis vous verrez apparaître une liste numérotée, tapez simplement \`c?p 1\` pour la 1ère piste de la liste, \`c?p 2\` pour la 2e, etc.`,
  syntaxe: "p <URL> ou <search>"
};
