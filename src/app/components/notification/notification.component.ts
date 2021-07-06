import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  socket: any;
  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private userService: UsersService) {
    // this.socket = io('http://loaclhost:3000');
  }

  ngOnInit() {

    this.user = this.tokenService.GetPayload();
    console.log(this.user);
    this.GetUser();
    // this.socket.on('refreshPage', ()=>{
    //   this.GetUser();
    // });
  }

  GetUser() {
    //*** getting data through id basis **********

    this.userService.getById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
    });

    // this.userService.getUserByName(this.user.username).subscribe(data =>{
    //      console.log(data);
    // });
  }

  MarkNotification(data) {
     this.userService.MarkNotification(data._id).subscribe( value =>{
        // this.socket.emit('refresh', {});
     });
  }

  DeleteNotification(data) {
    console.log(data);
  }

  TimeForNow(time) {
    return moment(time).fromNow();
  }
}
