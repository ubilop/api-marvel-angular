import { Component, OnInit } from '@angular/core';
import { MarvelapiService } from 'src/app/services/marvelapi.service';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  public characterJson:any;
	public renderCharacter:any;
	public contentCharacter:any;
  public id:any;
  public characters: Array<any> = [];


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
      });

			//this.contentCharacter = this.renderCharacter.content;

		})


    }

  ngOnInit(): void {


  }

}
