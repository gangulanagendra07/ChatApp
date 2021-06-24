import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit , AfterViewInit {

  toolBarElement: any;
  CommentForm: FormGroup;
  postId: any;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.toolBarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
  }

  init(){
    this.CommentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  ngAfterViewInit(){
    this.toolBarElement.style.display ='none';
  }

  AddComment(){
    this.postService.addComment(this.postId, this.CommentForm.value.comment).subscribe(data =>{
      console.log(data);
    });
    this.CommentForm.reset();
  }

}
