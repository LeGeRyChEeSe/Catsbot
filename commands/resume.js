module.exports = {
	name: 'resume',
	description: 'Permet de reprendre le lecture de la piste.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ La piste va reprendre !');
		}
		return message.channel.send("Aucune piste n'est jouée actuellement.");
	}
};