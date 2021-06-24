import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: "streams", component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id', component: CommentsComponent, canActivate: [AuthGuard]
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
