import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPollComponent } from '../view-poll/view-poll.component';
import { ViewPollsComponent } from '../view-polls/view-polls.component';

const pollRoutes: Routes = [
  { path: 'view-polls', component: ViewPollsComponent },
  { path: 'view-polls/:id', component: ViewPollComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(pollRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PollRoutingModule { }
