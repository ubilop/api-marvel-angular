import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { MarvelapiService } from 'src/app/services/marvelapi.service';

//Esto es la clase que se necesita para trabajar con formularios
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  authForm ! : FormGroup;


  public listTeam:any;
  public listUser:any;
	public userCreate:any;
	public errorUser:boolean = false;
	public validateCreate:boolean = false;
	public mensajeApi:any;
  public id:any = null;
  public characterJson:any;
	public renderCharacter:any;
	public contentCharacter:any;
  public characters: Array<any> = [];
  public idss:any = null;

  constructor(private readonly fb: FormBuilder,
              private authService: AuthService,
              private marvelapiService: MarvelapiService) {




              }



  /*	constructor(private authService: AuthService) {


  		this.listUser = {

  			user:null,
  			password:null,
  			description:null
  		}

  	} */

  	ngOnInit(): void {

      this.initForm();

      let login = localStorage.getItem('id-Team');
      let user = localStorage.getItem('user');
      let description = localStorage.getItem('description');
      let password = localStorage.getItem('password');

      if(login != null){

        this.authForm = this.fb.group({
          user: user,
          password: password,
          description: description
        });

        $('.btnSaveTeam').html('Actualizar');
        this.id = login;

        this.listTeam = {
          user:this.id
        }


        this.marvelapiService.getCharactersTeam(this.listTeam).subscribe( ( res ) => {

          this.characterJson = res;
          console.log('res',res);
          this.characters = res['data'];

        })



      }





  		/*=============================================
		VALIDAR FORMULARIO
		=============================================*/

		(function() {
		  'use strict';
		  window.addEventListener('load', function() {
		    // Get the forms we want to add validation styles to
		    var forms = document.getElementsByClassName('needs-validation');
		    // Loop over them and prevent submission
		    var validation = Array.prototype.filter.call(forms, function(form) {
		      form.addEventListener('submit', function(event) {
		        if (form.checkValidity() === false) {
		          event.preventDefault();
		          event.stopPropagation();
		        }
		        form.classList.add('was-validated');
		      }, false);
		    });
		  }, false);
		})();

  	}

    onSubmit(): void {
      console.log('Save', this.authForm.value);
    }

    private initForm() : void {
      this.authForm = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required],
        description: ['', Validators.required],
      })
  }

  deleteTeam(id:any){



    console.log('this.characterId', id);

    if(id != null){

      this.listUser = {
        id:id,
      }

        this.marvelapiService.deleteTeam(this.listUser)
      .subscribe( respuesta =>{

        console.log('respuesta', respuesta);

        this.userCreate = respuesta;



        if(this.userCreate["status"] == 200){



          this.validateCreate = true;
          this.errorUser = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            title   : 'El Pesonaje se ha eliminado correctamente',
            text    : this.mensajeApi,
            icon    : 'success',
            timer   : 5000
          });

          setTimeout(() => {

            window.location.reload();

          }, 2000);

        }else{

          this.errorUser = true;
          this.validateCreate = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.mensajeApi
            })

        }

      })
    }


  }

  	/*=================================
	Recibir formulario login
	===================================*/

	saveUser(): void{

    let team = this.authForm.value;

    if(this.id == null){

      this.listUser = {

        user:team['user'],
        password:team['password'],
        description:team['description']
      }

        this.authService.saveUser(this.listUser)
      .subscribe( respuesta =>{

        console.log('respuesta', respuesta);

        this.userCreate = respuesta;



        if(this.userCreate["status"] == 200){

          this.id = respuesta['data']['_id'];

          console.log('respuesta', respuesta['data']['_id']);

          this.validateCreate = true;
          this.errorUser = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            title   : 'Peteci??n Exitosa',
            text    : this.mensajeApi,
            icon    : 'success',
            timer   : 5000
          });

        }else{

          this.errorUser = true;
          this.validateCreate = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.mensajeApi
            })

        }

      })


    }else{

        this.listUser = {

          id: this.id,
          user:team['user'],
          password:team['password'],
          description:team['description']
        }

        this.authService.updateUser(this.listUser)
      .subscribe( respuesta =>{

        console.log('respuesta', respuesta);

        this.userCreate = respuesta;

        this.id = respuesta['data']['_id'];

        console.log('respuesta', respuesta['data']['_id']);

        if(this.userCreate["status"] == 200){

          this.validateCreate = true;
          this.errorUser = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            title   : 'Peteci??n Exitosa',
            text    : this.mensajeApi,
            icon    : 'success',
            timer   : 5000
          });


          localStorage.setItem('user', team['user']);
          localStorage.setItem('password', team['password']);
          localStorage.setItem('description', team['description']);

          setTimeout(() => {

            window.location.reload();

          }, 2000);



        }else{

          this.errorUser = true;
          this.validateCreate = false;
          this.mensajeApi = this.userCreate["mensaje"];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.mensajeApi
            })

        }

      })
    }




	}

}
