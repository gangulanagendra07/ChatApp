import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  tabElement: any;
  parentOnlineUsers = [];

  constructor() { }

  ngOnInit(){
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(){
     this.tabElement.style.display = 'none';
  }

// Added below method to export the data from parent to child component
  online(event){
    this.parentOnlineUsers = event;
  }

}
