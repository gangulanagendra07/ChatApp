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
import { RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/app/components/people/people.component'
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component'
import { UsersService } from 'src/app/services/users.service';
import { TopStreamsComponent } from 'src/app/components/top-streams/top-streams.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { MessageService } from 'src/app/services/message.service';
import {NgxAutoScrollModule} from 'ngx-auto-scroll'





@NgModule({


  imports: [

    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, NgxAutoScrollModule
  ],
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostformComponent, PostsComponent, CommentsComponent, PeopleComponent, FollowingComponent, FollowersComponent, NotificationComponent, TopStreamsComponent, ChatComponent, MessageComponent],

  exports: [
    StreamsComponent, ToolbarComponent, SideComponent, PostformComponent, PostsComponent, CommentsComponent, PeopleComponent, FollowingComponent, FollowersComponent, NotificationComponent, TopStreamsComponent, ChatComponent, MessageComponent],
  providers: [TokenService, PostService, UsersService, MessageService]
})
export class StreamsModule { }
