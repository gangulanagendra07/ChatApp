import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(private tokensService: TokenService, private messageService: MessageService, private route: ActivatedRoute, private userService: UsersService) { }

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
        }
      });
    });

  }

  sendMessage() {

    if (this.message) {
      this.messageService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        console.log(data);
        this.message = "";
      });
    }

  }

}
