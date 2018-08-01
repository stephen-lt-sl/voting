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

  getPollDetails(pollId: string): Observable<Poll> {
    const pollDetailsUrl = `${this.pollsApiUrl}/${pollId}`;
    return this.httpClient.get<Poll>(pollDetailsUrl);
  }

  createPoll(question: string, options: string[]): Observable<string> {
    const createPollUrl = `${this.pollsApiUrl}`;
    const newPoll = { question: question, options: options };
    return this.httpClient.post<Poll>(createPollUrl, newPoll, httpOptions).pipe(
      map(poll => `Create poll with id ${poll._id} and question "${poll.question}"!`)
    );
  }
}
