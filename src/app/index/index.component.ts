import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index' ,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent implements OnInit {

  //isLogged = false;
  nombreUsuario : string;
  
  

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    /*if(this.tokenService.getToken()){
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    } video 15*/
    this.nombreUsuario = this.tokenService.getUserName();
        
  }

}