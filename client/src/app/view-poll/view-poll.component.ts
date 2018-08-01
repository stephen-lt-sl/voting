import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of } from 'rxjs';
import { Poll } from '../models/poll';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  poll$: Observable<Poll>;

  constructor(private pollService: PollService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.poll$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const idParam = params.get('id');
        if (idParam) {
          return this.pollService.getPollDetails(idParam);
        }
        return of({ question: 'Poll not found', options: [] });
      })
    );
  }

}
