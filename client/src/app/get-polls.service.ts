import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Poll } from './models/poll';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetPollsService {

  private pollsApiUrl = 'api/polls';

  constructor(private httpClient: HttpClient) { }

  getAllPolls(): Observable<Poll[]> {
    const allPollsUrl = `${this.pollsApiUrl}/all`;
    return this.httpClient.get<Poll[]>(allPollsUrl);
  }
}
