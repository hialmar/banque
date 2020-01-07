import { Component } from '@angular/core';
import {BanqueService} from "./banque.service";
import {InfoCompte} from "./info.compte";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ic : InfoCompte;
  resultat: string;

  constructor(private banque: BanqueService) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  creerCompte() {
    this.resultat = "Opération en cours";
    this.banque.creerCompte(this.ic).subscribe((response) => {
      this.resultat = "Compte créé";
    }, (error) => {
      this.resultat = "Erreur : " + error.error.error;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error}`);
    });
  }

  ajouterAuCompte() {
    if(this.ic.somme > 0) {
      this.resultat = "Opération en cours";
      this.banque.ajouterAuCompte(this.ic).subscribe((response) => {
        this.resultat = "Compte crédité";
      }, (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      });
    } else {
      this.resultat = "La somme doit être positive";
    }
  }

  retirerDuCompte() {
    if(this.ic.somme > 0) {
      var retrait = new InfoCompte();
      retrait.id = this.ic.id;
      retrait.somme = -1 * this.ic.somme;
      this.resultat = "Opération en cours";
      this.banque.retirerDuCompte(retrait).subscribe((response) => {
        this.resultat = "Compte débité";
      }, (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      });
    } else {
      this.resultat = "La somme doit être positive";
    }
  }

  positionDuCompte() {
    this.banque.positionDuCompte(this.ic.id).subscribe((response) => {
      this.resultat = "Le compte d'id "+response.id+" a "+response.somme+
        " euros et la date de dernière opération est "+response.date;
    }, (error) => {
      this.resultat = "Erreur : " + error.error.error;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error}`);
    });
  }
}
