import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import { PollService } from './poll.service';
import { ViewPollComponent } from './view-poll/view-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    ViewPollsComponent,
    ViewPollComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    PollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
