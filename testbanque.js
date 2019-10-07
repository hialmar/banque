// on récupère le module
var banque = require('./banque');

// on teste les méthodes
console.log("banque.creerCompte('toto', 1000)");
console.log(banque.creerCompte('toto', 1000));
console.log("banque.creerCompte('toto', 1000)");
console.log(banque.creerCompte('toto', 1000));
console.log("banque.ajouterAuCompte('toto', 100)");
console.log(banque.ajouterAuCompte('toto', 100));
console.log("banque.ajouterAuCompte('titi', 100)");
console.log(banque.ajouterAuCompte('titi', 100));
console.log("banque.retirerDuCompte('toto', 100)");
console.log(banque.retirerDuCompte('toto', 100));
console.log("banque.retirerDuCompte('titi', 100)");
console.log(banque.retirerDuCompte('titi', 100));
console.log("banque.positionDuCompte('toto')");
console.log(banque.positionDuCompte('toto'));
console.log("banque.positionDuCompte('titi')");
console.log(banque.positionDuCompte('titi'));

