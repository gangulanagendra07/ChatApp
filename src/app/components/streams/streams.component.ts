import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  token: any;
  constructor(private tokenService: TokenService, private router: Router , private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.tokenService.GetPayload();
    // console.log(token);
  }
}
