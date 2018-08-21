import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import { User } from '../models/user';
import { tap } from '../../../../node_modules/rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class FullPollDetails extends Poll {
  users: any;
}

@Injectable({
  providedIn: 'root'
})
export class GetPollsService {

  private pollsApiUrl = 'api/polls';

  constructor(private httpClient: HttpClient) { }

  getAllPolls(): Observable<Poll[]> {
    const allPollsUrl = `${this.pollsApiUrl}`;
    return this.httpClient.get<Poll[]>(allPollsUrl);
  }

  getPollDetails(pollId: string): Observable<FullPollDetails> {
    const pollDetailsUrl = `${this.pollsApiUrl}/${pollId}`;
    return this.httpClient.get<FullPollDetails>(pollDetailsUrl).pipe(tap(console.log));
  }
}
