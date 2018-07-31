import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll';
import { Observable } from 'rxjs';
import { PollService } from '../poll.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls$: Observable<Poll[]>;

  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.polls$ = this.pollService.getAllPolls().pipe(
      map(polls => polls.map(poll => ({ _id: poll._id.substring(poll._id.length - 4), question: poll.question })))
    );
  }

}
