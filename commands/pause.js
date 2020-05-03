module.exports = {
	name: 'pause',
	description: 'Permet de mettre en pause la piste actuelle.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ La musique est en pause !');
		}
		return message.channel.send('Aucune piste en cours.');
	}
};