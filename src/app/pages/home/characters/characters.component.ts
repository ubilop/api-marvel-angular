import { Component, OnInit } from '@angular/core';
import { MarvelapiService } from '../../../services/marvelapi.service';
import {NgxPaginationModule} from 'ngx-pagination';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public characters: Array<any> = [];
  public description:any = "";

  constructor(private character: MarvelapiService) { }

  ngOnInit(): void {

    this.character.getCharacters().subscribe((res) => {
      console.log('Respuesta', res);
      this.characters = res.data.results;

      setTimeout(() => {

        $('.preload').attr('style', 'display:none;')

      }, 300);
    });
  }

}
