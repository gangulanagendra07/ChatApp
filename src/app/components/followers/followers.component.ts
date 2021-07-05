import { Component, ErrorHandler, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
// import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;
  socket: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    // this.socket = io('http://loaclhost:3000');
   }

  ngOnInit(){

     this.user = this.tokenService.GetPayload();
     this.getUser();
     //  this.socket.on('refreshPage', () =>{
    //   this.getUser();
    // });
  }

  getUser(){
    this.usersService.getById(this.user._id).subscribe( data =>{
         this.followers = data.result.followers;
    }, err => console.log(err)
    );
  }

}
