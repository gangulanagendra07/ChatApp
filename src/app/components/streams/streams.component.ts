import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  token: any;
  streamsTab: Boolean = false;
  topStreamsTab: Boolean = false;
  constructor(private tokenService: TokenService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.streamsTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    // console.log(token);
  }

  ChangeTab(value) {

    if (value === "stream") {
      this.topStreamsTab = false;
      this.streamsTab = true;
    }
    if (value === "top") {
      this.topStreamsTab = true;
      this.streamsTab = false;
    }
  }

}
