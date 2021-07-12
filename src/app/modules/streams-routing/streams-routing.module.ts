import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { PeopleComponent } from 'src/app/components/people/people.component';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component'
import { AuthGuard } from 'src/app/services/auth.guard';
import { ChatComponent } from 'src/app/components/chat/chat.component';

const routes: Routes = [
  {
    path: "streams", component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id', component: CommentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'people', component: PeopleComponent, canActivate: [AuthGuard]
  },
  {
    path: 'following', component: FollowingComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'followers', component: FollowersComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name', component: ChatComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
