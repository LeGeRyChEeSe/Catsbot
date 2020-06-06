module.exports.run = (client, msg, args) => {};

module.exports.help = {
  name: "mute",
  title: "Muter un membre",
  description: "Permet de muter un membre pendant un temps donné",
  help:
    "Muter un membre pour l'empêcher d'écrire dans tous les canaux. Préciser le temps après avoir mentionné le membre :\nSecondes : `<temps>s`\nMinutes : `<temps>m`\nHeures : `<temps>h`\nEtc.",
  syntaxe: "mute <@membre> <temps>",
  permissions: {
    admin: true,
    lieutenants: false,
    major: false,
    membres: false,
  },
};
