import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;
  userArr: any = [];

  constructor(private userService: UsersService, private tokenService: TokenService) {
    // this.socket = io('http://loaclhost:3000');
  }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();

    // this.socket.on('refreshPage', () =>{
    //   this.GetUsers();
    //   this.GetUser();
    // });

  }

  GetUsers() {
    this.userService.getAllUsers().subscribe(data => {
      // Here we are using lodash method to remove loggedInUser from server response.
      _.remove(data.result, { username: this.loggedInUser.username });
      this.users = data.result;
    });
  }

  GetUser() {
    this.userService.getById(this.loggedInUser._id).subscribe(data => {
      this.userArr = data.result.following;
    });
  }

  FollowUser(user) {
    this.userService.followUser(user._id).subscribe(data => {
      // this.socket.emit('refresh', {});
    });
  }

  CheckInArray(arr, id) {
    const result = _.find(arr, ['userfollowed._id', id]);
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }

}
