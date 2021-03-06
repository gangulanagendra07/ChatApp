import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  toolBarElement: any;
  socket: any;
  CommentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    //  this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.toolBarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.GetPost();
    // this.socket.on('refershPage', data =>{
    //    this.GetPost();
    // });
  }

  init() {
    this.CommentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.toolBarElement.style.display = 'none';
  }

  AddComment() {
    this.postService.addComment(this.postId, this.CommentForm.value.comment).subscribe(data => {
      console.log(data);
    });
    this.CommentForm.reset();
  }

  GetPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      //  this.socket.emit('refresh', {});
      this.post = data.post.post;
      this.commentsArray = data.post.comments.reverse();
    });
  }

  TimeForNow(time) {
    return moment(time).fromNow();
  }

}
