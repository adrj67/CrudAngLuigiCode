
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 // isLogged = false;
  //isLoginFail = false;
  loginUsuario : LoginUsuario;
  nombreUsuario: string;
  password : string;
  //roles: string[] = [];
  errMsj : string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
   /* if(this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getUserAuthorities();
      //console.log(this.tokenService);
    } video 16 */
  }

  onLogin():void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: data => {
        //this.isLogged = true;
        //this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        /*this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setUserAuthorities(data.authorities);
        this.roles = data.authorities;*/
        //console.log(this.tokenService);
        /*this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });*/
        this.router.navigate(['/']);
    },
      error: err => {
        //this.isLogged = false;
        //this.isLoginFail = true;
        this.errMsj = err.error;
        //console.error(err.error);
        this.toastr.error(this.errMsj, 'Fail', { //err.error.mensaje
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
    });
  }
}
