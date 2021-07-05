import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
  user: any;
  socket: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {

    // this.socket = io('http://loaclhost:3000');

  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    console.log(this.user);
    this.GetUser();
    //  this.socket.on('refreshPage', () =>{
    //   this.GetUser();
    // });

  }

  GetUser() {
    this.usersService.getById(this.user._id).subscribe(data => {
      this.following = data.result.following;
    }, err => {
      console.log(err);
    });
  }

  UnFollowedUser(user) {
    this.usersService.unfollowUser(user._id).subscribe(data => {
      console.log(data);
      // this.socket.emit("refresh", {});
    });
  }

}
