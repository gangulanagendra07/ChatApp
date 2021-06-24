import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { TokenService } from 'src/app/services/token.service';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { SideComponent } from 'src/app/components/side/side.component';
import { PostformComponent } from 'src/app/components/postform/postform.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { PostService } from 'src/app/services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from 'src/app/components/comments/comments.component'




@NgModule({


  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostformComponent, PostsComponent, CommentsComponent],

  exports: [
    StreamsComponent, ToolbarComponent, SideComponent, PostformComponent, PostsComponent, CommentsComponent
  ],
  providers: [TokenService, PostService]
})
export class StreamsModule { }