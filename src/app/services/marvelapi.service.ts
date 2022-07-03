import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class MarvelapiService {

  public url: string;
  public key: string;
  public hash: string;

  constructor(public http: HttpClient) {

    this.url = Ruta.url;
    this.key = Ruta.key;
    this.hash = Ruta.hash;
  }

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
  }

