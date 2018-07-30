import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls: Poll[] = [
    { id: 0, question: 'What should we have for lunch?' },
    { id: 1, question: 'Who is the coolest in the office?' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
