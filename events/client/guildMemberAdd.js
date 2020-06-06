module.exports = (member) => {
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
};
