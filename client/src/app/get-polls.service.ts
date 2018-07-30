import { Injectable } from '@angular/core';
import { Observable, of } from '../../../node_modules/rxjs';
import { Poll } from './models/poll';

@Injectable({
  providedIn: 'root'
})
export class GetPollsService {

  constructor() { }

  getAllPolls(): Observable<Poll[]> {
    return of([
      { id: 0, question: 'What should we have for lunch?' },
      { id: 1, question: 'Who is the coolest in the office?' },
    ]);
  }
}
