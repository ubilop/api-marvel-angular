import { Component, OnInit } from '@angular/core';
import { MarvelapiService } from 'src/app/services/marvelapi.service';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {


  public listTeam:any;
  public teamCreate:any;
	public errorTeam:boolean = false;
	public validateCreate:boolean = false;
	public mensajeApi:any;
  public characterJson:any;
	public renderCharacter:any;
	public contentCharacter:any;
  public id:any;
  public description:any;
  public characters: Array<any> = [];
  public validateLogin:any = null;
  public foto:any;
  public name:any;


  constructor(activatedRoute: ActivatedRoute,
    private marvelapiService: MarvelapiService) {


    /*=============================================
		RECIBIENDO DATOS DINÁMICOS
		=============================================*/

		this.marvelapiService.getCharactersAll().subscribe( res => {

			this.characterJson = res;
      console.log('res',res);

			this.renderCharacter = this.characterJson["data"]["results"].find(resp => {

				this.id = activatedRoute.snapshot.params["id"];
        console.log('this.id', this.id);

			})

      this.marvelapiService.getCharacter(this.id).subscribe((res) => {
        console.log('Respuesta', res);
        this.characters = res.data.results;
        this.description = res.data.results['description'];
        setTimeout(() => {

          $('.preload').attr('style', 'display:none;')

        }, 300);
      });

			//this.contentCharacter = this.renderCharacter.content;

		})


    }

  ngOnInit(): void {

    if(localStorage.getItem('id-Team')){

      this.validateLogin = localStorage.getItem('id-Team');

    }


  }

  public addCharacter() {


    if(this.validateLogin != null){

      let name = $('.name-character').html();
      let ruta = $('.img-character').attr('src');
      let user = this.validateLogin;


     // console.log('Agregar el usuario Id', this.id);
      console.log('ruta', ruta);
      console.log('name', name);
      console.log('idUser', user);

      this.listTeam = {

        user:user,
        ruta:ruta,
        name:name
      }

        this.marvelapiService.saveTeam(this.listTeam)
      .subscribe( respuesta =>{

        console.log('respuesta', respuesta);

        this.teamCreate = respuesta;



        if(this.teamCreate["status"] == 200){

          this.id = respuesta['data']['_id'];

          console.log('respuesta', respuesta['data']['_id']);

          this.validateCreate = true;
          this.errorTeam = false;
          this.mensajeApi = this.teamCreate["mensaje"];

          Swal.fire({
            title   :  name + ' en tu Equipo',
            text    : this.mensajeApi,
            icon    : 'success',
            timer   : 5000
          });

          setTimeout(() => {

            window.location.reload();

          }, 2000);

        }else{

          this.errorTeam = true;
          this.validateCreate = false;
          this.mensajeApi = this.teamCreate["mensaje"];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.mensajeApi
            })

        }

      })

    }else{

      $('.modal').modal('show');


    }

  }

}
