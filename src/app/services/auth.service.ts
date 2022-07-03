import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url : string;

  	constructor(private http: HttpClient) {

  		this.url = Ruta.api;

   	}

   	/*=============================================
   	PETICIÓN POST API MONGODB
   	=============================================*/

   	saveUser(listUser){

   		const headers = new HttpHeaders();

      console.log('listUser', listUser);

   		return this.http.post(`${this.url}/create-user`, listUser, {headers});

   	}

    /*=============================================
   	PETICIÓN PUT API MONGODB
   	=============================================*/

   	updateUser(listUser){

      const headers = new HttpHeaders();

     console.log('listUser', listUser['id']);

      return this.http.put(`${this.url}/edit-user/${listUser['id']}`, listUser, {headers});

    }

   	/*=============================================
   	LOGIN ANGULAR Y NODEJS
   	=============================================*/

   	loginUser(listUser){

   		const headers = new HttpHeaders();

   		return this.http.post(`${this.url}/login-user`, listUser, {headers});

   	}

 async sigIn(credentials): Promise<any> {

  }
}
