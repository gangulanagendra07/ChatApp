import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(private router: Router, private tokenService: TokenService, private cookieService: CookieService){}

  ngOnInit(){

    const token = this.tokenService.GetToken();
     //console.log("Main", token);
   // const token = this.cookieService.get('chat-token');

    if(token != null){
      this.router.navigate(['streams'])
    }else{
        this.router.navigate(['']);
    }

  }
}
