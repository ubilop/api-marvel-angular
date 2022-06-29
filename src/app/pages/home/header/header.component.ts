import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  	constructor() { }

 	ngOnInit(): void {

  		/*=============================================
		STICKY JS
		=============================================*/

		if(window.matchMedia("(min-width:992px)").matches){

			$("#inicio").sticky({topSpacing:0, zIndex:1000});

		}

 	 }

}
