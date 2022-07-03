import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

declare var jQuery:any;
declare var $:any;

export interface OptionsForm {
  id: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  authForm ! : FormGroup;

  constructor(private readonly fb: FormBuilder,
    private authService: AuthService) { }

  public listUser:any;
	public userLogeo:any;
	public errorLogin:boolean = false;
	public validateLogin:boolean = false;
	public mensajeApi:any;
  public id:any = null;
  public token:any = null;

 	ngOnInit(): void {

    this.initForm();

    let login = localStorage.getItem('id-Team');
    let user = localStorage.getItem('user');

    if(login != null){

      $('.login').attr('data-target', '');
      $('.login').attr('data-toggle', '');
      $('.login').html(user);
      $('.logout').attr('style', 'display:block');

    }

  		/*=============================================
		STICKY JS
		=============================================*/

		if(window.matchMedia("(min-width:992px)").matches){

			$("#inicio").sticky({topSpacing:0, zIndex:1000});

		}

 	 }

    onSubmit(): void {
      console.log('Save', this.authForm.value);
    }
    private initForm() : void {
      this.authForm = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

    logout(): void{

      $('.login').attr('data-target', '#myModal');
      $('.login').attr('data-toggle', 'modal');
      $('.login').html('Sing In');
      $('.logout').attr('style', 'display:none');
      localStorage.clear();


      $('.btnSaveTeam').html('Guardar');
      this.id = null;

      window.location.reload();

    }

    userLogin() {

      $('.btnLogin').addClass('disabled');


      let user = this.authForm.value;

      if(user['user'] == "" && user['password'] == ""){
        alert('Rellene Usuario y Clave');
        return;
      }

      console.log('Data', user);

      this.listUser = {

        user:user['user'],
        password:user['password'],
      }

        this.authService.loginUser(this.listUser)
      .subscribe( respuesta =>{

        console.log('respuesta', respuesta);

        this.userLogeo = respuesta;


        console.log('respuesta', respuesta['data']['_id']);

        if(this.userLogeo["status"] == 200){

          this.id = respuesta['data']['_id'];
          this.token = respuesta['token'];

          localStorage.setItem('id-Team', this.id);
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', user['user']);
          localStorage.setItem('password', user['password']);
          localStorage.setItem('description', respuesta['data']['description']);

          this.validateLogin = true;
          this.errorLogin = false;
          this.mensajeApi = this.userLogeo["mensaje"];

          setTimeout(() => {

            $('.btnLogin').removeClass('disabled');

            $('.login').attr('data-target', '');
            $('.login').attr('data-toggle', '');
            $('.login').html('user["user"]');
            $('.modal').modal('hide');

            $('#user').val(user['user']);

            $('.btnSaveTeam').html('Actualizar');
            window.location.reload();


          }, 2000);

        }else{

          this.errorLogin = true;
          this.validateLogin = false;
          this.mensajeApi = this.userLogeo["mensaje"];

          $('.btnLogin').removeClass('disabled');

        }

      })

    }

}
