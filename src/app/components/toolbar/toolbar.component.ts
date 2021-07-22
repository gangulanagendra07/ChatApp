import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;

  constructor(private tokenService: TokenService, private router: Router, private userService: UsersService) {
    // this.socket = io('http://loaclhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    const dropDownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropDownElementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });


    this.GetUser();
    // this.socket.on('refreshPage', ()=>{
    //   this.GetUser();
    // });
  }

  GetUser() {
    this.userService.getById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      // console.log(value);
      this.count = value;
      this.chatList = data.result.chatList;
      this.CheckIfRead(this.chatList);
      console.log(this.msgNumber);
    }, err => {
      if (err.error.token) {
        this.tokenService.DeleteToken();
        this.router.navigate(["/"]);
      }
    });
  }

  logOut() {
    this.tokenService.DeleteToken();
    localStorage.clear();
    this.router.navigate(['']);
  }
  MarkAll() {

    this.userService.MarkAllAsRead().subscribe(data => {
      // this.socket.emit('refresh', {});
      // console.log(data);
    });
  }

  CheckIfRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== `/chat/${receiver.sendername}`) {
        if (receiver.isRead === false && receiver.receivername === this.user.username) {
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }

      }
    }
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  TimeForNow(time) {
    return moment(time).fromNow();
  }

  MessageDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[DD/MM/YYYY]',
      sameElse: '[DD/MM/YYYY]'
    });
  }

}
