import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public url : string;

  constructor(private http: HttpClient) {

    this.url = Ruta.api;
  }

     	/*=============================================
   	PETICIÓN POST API MONGODB
   	=============================================*/

   	saveTeam(listTeam){

      const headers = new HttpHeaders();

     console.log('listTeam', listTeam);

      return this.http.post(`${this.url}/create-teams`, listTeam, {headers});

    }

   /*=============================================
    PETICIÓN PUT API MONGODB
    =============================================*/

    deleteTeam(listTeam){

     const headers = new HttpHeaders();

    console.log('listTeam', listTeam['id']);

     return this.http.delete(`${this.url}/delete-teams/${listTeam['id']}`, {headers});

   }
}
