import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../models/poll';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  @Input() poll: Poll = { question: '', pollOptions: [
    { optionText: 'First option' },
    { optionText: 'Second option' },
  ] };

  constructor() { }

  ngOnInit() {
  }

  addOption(optionText: string) {
    if (optionText !== '') {
      this.poll.pollOptions.push({ id: this.poll.pollOptions.length, pollId: this.poll.id, optionText: optionText });
    }
  }

  onUpdateOption(optionIdx: number) {
    if (this.poll.pollOptions[optionIdx].optionText === '') {
      this.poll.pollOptions.splice(optionIdx, 1);
    }
  }

}
