import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class MarvelapiService {

  public url: string;
  public key: string;
  public hash: string;
  public api: string;

  constructor(public http: HttpClient) {

    this.url = Ruta.url;
    this.key = Ruta.key;
    this.hash = Ruta.hash;
    this.api = Ruta.api;
  }

      /*=============================================
   	OBSERVABLE LISTADO DE PERSONAJES APIMARVEL
   	=============================================*/

  getAllCharacters () : Observable<any> {
    let url =
        `${this.url}characters?ts=1000&apikey=${this.key}&hash=${this.hash}` +'&offset=0&limit=100';

        return this.http.get(url).pipe(
          map((res: any) => {
            return res;
          }),
          retry(5)
        );
  }

    /*=============================================
   	OBSERVABLE DE PERSONAJE APIMARVEL
   	=============================================*/
  public getCharacter(id:string) : Observable<any> {

    let url =
      `${this.url}characters/${id}?ts=1000&apikey=${this.key}&hash=${this.hash}`;


      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }

  public getCharacters() {

    let url =
      `${this.url}characters?ts=1000&apikey=${this.key}&hash=${this.hash}` +
      '&offset=' +
      '0' +
      '&limit=' +
      '8';


      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }

    public getCharactersAll() {
      let url =
        `${this.url}characters?ts=1000&apikey=${this.key}&hash=${this.hash}` +
        '&offset=' +
        '0' +
        '&limit=' +
        '100';


        return this.http.get(url).pipe(
          map((res: any) => {
            return res;
          }),
          retry(5)
        );
      }

    /*=============================================
   	PETICIÓN POST API MONGODB
   	=============================================*/

   	saveTeam(listTeam){

      const headers = new HttpHeaders();

     console.log('listTeam', listTeam);

      return this.http.post(`${this.api}/create-teams`, listTeam, {headers});

    }

    getCharactersTeam(listTeam){

      const headers = new HttpHeaders();

      console.log('listTeam', listTeam);

      return this.http.post(`${this.api}/get-teams`, listTeam, {headers});

    }

   /*=============================================
    PETICIÓN DELETE API MONGODB
    =============================================*/

    deleteTeam(listTeam){

     const headers = new HttpHeaders();

    console.log('listTeam', listTeam['id']);

     return this.http.delete(`${this.api}/delete-teams/${listTeam['id']}`, {headers});

   }
  }

