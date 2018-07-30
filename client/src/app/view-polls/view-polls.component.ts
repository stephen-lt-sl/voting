import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll';
import { Observable } from '../../../../node_modules/rxjs';
import { GetPollsService } from '../get-polls.service';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls$: Observable<Poll[]>;

  constructor(private getPolls: GetPollsService) { }

  ngOnInit() {
    this.polls$ = this.getPolls.getAllPolls();
  }

}
