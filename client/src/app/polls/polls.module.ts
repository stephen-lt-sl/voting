import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';
import { PollRoutingModule } from './poll-routing/poll-routing.module';
import { GetPollsService } from './get-polls.service';

@NgModule({
  imports: [
    CommonModule,
    AuthModule.forRoot(),
    PollRoutingModule,
  ],
  declarations: [
    ViewPollComponent,
    ViewPollsComponent
  ],
  providers: [
    OidcSecurityService,
    GetPollsService,
  ]
})
export class PollsModule { }
