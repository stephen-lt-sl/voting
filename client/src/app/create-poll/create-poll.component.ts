import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../models/poll';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  @Input() question: string;
  @Input() options: string[] = [];
  createResult: Observable<string>;

  constructor(private pollService: PollService, private router: Router) { }

  ngOnInit() {
  }

  addOption(optionText: string) {
    if (optionText !== '') {
      this.options.push(optionText);
    }
  }

  onUpdateOption(optionIdx: number) {
    if (this.options[optionIdx] === '') {
      this.options.splice(optionIdx, 1);
    }
  }

  pollIsValid() {
    return this.question !== undefined && this.question.length > 0;
  }

  submitPoll() {
    if (this.pollIsValid()) {
      this.pollService.createPoll(this.question, this.options)
        .subscribe(createdPoll => {
          return this.router.navigate([`view-polls/${createdPoll._id}`]);
        });
    }
  }

}
