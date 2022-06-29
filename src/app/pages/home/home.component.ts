import { Component, OnInit } from '@angular/core';

//Esto es la clase que se necestia para navegar entre páginas
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    	/*=============================================
		NAVEGACIÓN SCROLL
		=============================================*/

		$(".nav-link").click(function(){


			var target = $(".nav-link").attr("href");

			$("html, body").animate({

				scrollTop: $(target).offset().top

			},1000, "easeOutBack")

		})

		/*=============================================
		SCROLL UP
		=============================================*/

		$.scrollUp({
			scrollText: "",
			scrollSpeed:2000,
			easingType: "easeOutQuint"
		})

		$("#scrollUp").css({

			bottom: "20px",
			right: "20px",
			width: "50px",
			height: "50px",
			background: "url(../assets/img/flecha.jpg)"

		})
  	}
  }


