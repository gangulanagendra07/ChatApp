import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TokenService } from '../../services/token.service'
import * as moment from 'moment';
// import io from 'socket.io-client'
import * as _ from "lodash";
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  // socket: any;
  topPsots = [];
  user: any;

  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {

    // this.socket = io('http://localhost/3000');
  }

  ngOnInit() {
    this.AllPosts();
    // this.socket.on('refreshPage', (data)=>{
    //   this.AllPosts();
    // });
    this.user = this.tokenService.GetPayload();
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.topPsots = data.top;
    }, err => {
      if (err.error.token) {
        this.tokenService.DeleteToken();
        this.router.navigate([""]);
      }
    });
  }

  LikePost(post) {
    this.postService.addLike(post).subscribe(posts => {
      // console.log("LikePost", posts);
    });
  }

  CheckInLikesPost(arr, username) {
    return _.some(arr, { username: username });
  }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }

  TimeForNow(time) {
    return moment(time).fromNow();
  }



}
