import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../models/poll';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  @Input() question: string;
  @Input() options: string[] = [];

  constructor() { }

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

}
