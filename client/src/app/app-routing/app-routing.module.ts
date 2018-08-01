import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreatePollComponent } from '../create-poll/create-poll.component';
import { ViewPollsComponent } from '../view-polls/view-polls.component';
import { ViewPollComponent } from '../view-poll/view-poll.component';

const appRoutes: Routes = [
  { path: 'create-poll', component: CreatePollComponent },
  { path: 'view-polls', component: ViewPollsComponent },
  { path: 'view-poll/:id', component: ViewPollComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
      }
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
