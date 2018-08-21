import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { User } from './models/user';
import { Observable, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private securityService: OidcSecurityService, private httpClient: HttpClient) { }

  private usersApiUrl = 'api/users';

  getCurrentUserId(): Observable<string> {
    return this.securityService.getIsAuthorized().pipe(
      take(1),
      switchMap(isAuthorized => {
        return isAuthorized ?
          of(this.securityService.getPayloadFromIdToken()['sub']) :
          empty();
      }));
  }

  getCurrentUser(): Observable<User> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        return this.getUser(userId);
      }));
  }

  getUser(userId: string): Observable<User> {
    const userUrl = `${this.usersApiUrl}/${userId}`;
    return this.httpClient.get<User>(userUrl);
  }

  getUsersForPoll(pollId: string): Observable<User[]> {
    const pollUsersUrl = `${this.usersApiUrl}/poll/${pollId}`;
    return this.httpClient.get<User[]>(pollUsersUrl);
  }

}
