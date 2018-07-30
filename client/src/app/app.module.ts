import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ViewPollsComponent } from './view-polls/view-polls.component';
import { GetPollsService } from './get-polls.service';

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    ViewPollsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    GetPollsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
