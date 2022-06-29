import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /*=============================================
			JD SLIDER
			=============================================*/

			$('.slideshow').jdSlider({

				wrap:'.slide-inner', //Especificar el slide que vamos a usar
				isAuto: true, //Inicia la animación automáticamente
				isLoop: true, //Al finalizar vuelve a comenzar
				interval: 7000, //Tiempo por cada slide
				isCursor:true //Pausar animación con el mouse

			});
  }
  callback(){




	}

}
