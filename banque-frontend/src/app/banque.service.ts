import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoCompte } from './info.compte';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  restURL = environment.restURL;

  constructor(private httpClient: HttpClient) { }

  creerCompte(ic: InfoCompte): Observable<any> {
    return this.httpClient.post(this.restURL, ic);
  }

  ajouterAuCompte(ic: InfoCompte) : Observable<any> {
    return this.httpClient.put(this.restURL + ic.id, ic);
  }

  retirerDuCompte(ic: InfoCompte) : Observable<any> {
    return this.httpClient.put(this.restURL + ic.id, ic);
  }

  positionDuCompte(id: string): Observable<any> {
    return this.httpClient.get(this.restURL + id);
  }

}
