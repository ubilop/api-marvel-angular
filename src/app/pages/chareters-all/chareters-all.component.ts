import { Component, OnInit } from '@angular/core';
import { MarvelapiService } from '../../services/marvelapi.service';
import { HomeComponent } from '../home/home.component';
//Esto es la clase que se necesita para navegar entre páginas
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chareters-all',
  templateUrl: './chareters-all.component.html',
  styleUrls: ['./chareters-all.component.css']
})
export class CharetersAllComponent implements OnInit {

  public characters: Array<any> = [];
  public description:any = "";

  constructor(private character: MarvelapiService) { }

  ngOnInit(): void {

    this.character.getCharactersAll().subscribe((res) => {
      console.log('Respuesta', res);
      this.characters = res.data.results;
    });

  }

}
