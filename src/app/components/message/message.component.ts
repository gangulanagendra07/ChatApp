import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
// import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  user: any;
  receiver: string;
  message: string;
  users = [];
  receiverData: any;
  receiverDataName: any;
  messagesArray = [];
  socket: any;
  typingMessage;
  typing = false;


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

    // this.socket.on('Is_typing', data => {
    //   if (data.sender === this.receiver) {
    //     this.typing = true;
    //   }
    // });

    // this.socket.on('has_stopped_typing', data => {
    //   if (data.sender === this.receiver) {
    //     this.typing = true;
    //   }
    // });

  }

  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };
    // this.socket.emit('join chat', params);
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

  // Created IsTyping method to listen event whether user is tying or not.
  IsTyping() {
    // this.socket.emit('start_typing', {
    //   sender: this.user.username,
    //   receiver: this.receiver
    // });

    // if(this.typingMessage){
    //     clearTimeout(this.typingMessage);
    // }

    // this.typingMessage = setTimeout(() => {
    //   this.socket.emit('stop_typing', {
    //     //   sender: this.user.username,
    //     //   receiver: this.receiver
    //   })
    // }, 500)
  }

}
