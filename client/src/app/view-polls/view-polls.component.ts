import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll';
import { Observable } from 'rxjs';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls$: Observable<Poll[]>;

  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.polls$ = this.pollService.getAllPolls();
  }

}
