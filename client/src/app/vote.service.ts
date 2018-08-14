import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private votesApiUrl = 'api/votes';

  constructor(private httpClient: HttpClient) { }

  submitVote(pollId: string, pollOptionId: string) {
    return this.httpClient.post(`${this.votesApiUrl}`,
    { pollId: pollId, pollOptionId: pollOptionId },
    { responseType: 'text' });
  }
}
