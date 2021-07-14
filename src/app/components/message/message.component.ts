import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  user: any;
  receiver: string;
  message: string;
  users = [];
  receiverData: any;
  receiverDataName: any;
  messagesArray = [];
  socket: any;

  constructor(private tokensService: TokenService, private messageService: MessageService, private route: ActivatedRoute, private userService: UsersService) {
    // this.socket = io('http://localhost:3000');
  }


  ngOnInit() {

    this.user = this.tokensService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data.result;
      this.users.forEach(usersdata => {
        if (usersdata.username === this.receiver) {
          this.receiverData = usersdata;
          this.GetMessages(this.user._id, this.receiverData._id);
        }
      });
    });

    // this.socket.on('refreshPage', () => {
    //   this.userService.getAllUsers().subscribe(data => {
    //     this.users = data.result;
    //     this.users.forEach(usersdata => {
    //       if (usersdata.username === this.receiver) {
    //         this.receiverData = usersdata;
    //         this.GetMessages(this.user._id, this.receiverData._id);
    //       }
    //     });
    //   });
    // });

  }

  GetMessages(senderId, receiverId) {
    this.messageService.GetAllMessages(senderId, receiverId).subscribe(data => {
      this.messagesArray = data.messages.message;
    });
  }

  sendMessage() {

    if (this.message) {
      this.messageService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        // this.socket.emit('refresh', {});
        this.message = "";
      });
    }

  }

}
