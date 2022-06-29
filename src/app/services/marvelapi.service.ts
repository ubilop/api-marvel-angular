import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarvelapiService {
  constructor(public http: HttpClient) {}

  public getCharacters() {
    let url =
      'https://gateway.marvel.com/v1/public/characters?ts=1000&apikey=8bd88b2b7a47152737745824515fd13d&hash=81057aea1a80278beef337c7a2adf81c' +
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
  }

