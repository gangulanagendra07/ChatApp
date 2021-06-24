import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private cookieService: CookieService) { }


  SetToken(token){
    this.cookieService.set('chat-token', token);
  }

  GetToken(){
   return this.cookieService.get('chat-token');
  }

  DeleteToken(){
    this.cookieService.delete('chat-token');
  }

  GetPayload(){
    const token = this.GetToken();
    let payload: any;
    if(token){
       payload = token.split('.')[1];
       payload = JSON.parse(window.atob(payload))
    }
    return payload.data;
  }
}
