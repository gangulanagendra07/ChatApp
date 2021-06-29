import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users = [];
  loggedInUser: any;

  constructor(private userService: UsersService, private tokenService: TokenService) { }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();
  }

  GetUsers(){
    this.userService.getAllUsers().subscribe(data => {
      // Here we are using lodash method to remove loggedInUser from server response.
      _.remove(data.result, {username: this.loggedInUser.username});
       this.users = data.result;
    });
  }

  GetUser(){
    this.userService.getById(this.loggedInUser._id).subscribe(data => {
      console.log(data);
    });
  }

  FollowUser(user){
    this.userService.followUser(user._id).subscribe(data =>{
        console.log(data);
    })
  }

}
