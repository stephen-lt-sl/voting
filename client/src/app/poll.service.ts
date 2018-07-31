import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Poll } from './models/poll';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private pollsApiUrl = 'api/polls';

  constructor(private httpClient: HttpClient) { }

  getAllPolls(): Observable<Poll[]> {
    const allPollsUrl = `${this.pollsApiUrl}`;
    return this.httpClient.get<Poll[]>(allPollsUrl);
  }

  createPoll(question: string): Observable<string> {
    const createPollUrl = `${this.pollsApiUrl}`;
    return this.httpClient.post<Poll>(createPollUrl, { question: question }, httpOptions).pipe(
      map(poll => `Create poll with id ${poll.id} and question ${poll.question}!`)
    );
  }
}
