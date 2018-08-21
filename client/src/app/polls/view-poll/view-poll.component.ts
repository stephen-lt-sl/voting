import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, BehaviorSubject, empty } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { PollOption } from '../../models/poll-option';
import { VoteService } from '../../vote.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { GetPollsService, FullPollDetails } from '../get-polls.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit, OnDestroy {

  poll$: Observable<FullPollDetails>;
  triggerRefreshPoll$: BehaviorSubject<null>;
  currentlySelectedOption: string;

  errorMessage: string;

  constructor(private getPollsService: GetPollsService, private route: ActivatedRoute, private voteService: VoteService,
    private securityService: OidcSecurityService) {}

  ngOnInit() {
    this.triggerRefreshPoll$ = new BehaviorSubject(null);
    this.poll$ = this.triggerRefreshPoll$.pipe(
      switchMap(() => {
        return this.route.paramMap.pipe(
          switchMap((params: ParamMap) => {
            const idParam = params.get('id');
            if (idParam) {
              return this.getPollsService.getPollDetails(idParam);
            }
            return of({ question: 'Poll not found', options: [] });
          })
        );
      }),
    tap(poll => {
      this.securityService.getIsAuthorized().pipe(take(1)).subscribe(isAuthorized => {
        if (poll.options === undefined || !isAuthorized) {
          return;
        }
        const userId = this.securityService.getPayloadFromIdToken()['sub'];
        for (const option of poll.options) {
          if (option.voterIds !== undefined && option.voterIds.find(voterId => voterId === userId)) {
            this.currentlySelectedOption = option._id;
          }
        }
      });
    }));
  }

  ngOnDestroy() {
    this.triggerRefreshPoll$.complete();
  }

  submitVote(pollId: string, pollOption: PollOption) {
    this.securityService.getIsAuthorized().pipe(
      take(1),
      switchMap(isAuthorized => {
        if (!isAuthorized) {
          this.errorMessage = 'Cannot vote without being signed in!';
          return empty();
        }
        return this.voteService.submitVote(pollId, pollOption._id);
      })
    ).subscribe(result => {
      console.log(result);
      this.triggerRefreshPoll$.next(null);
    }, err => console.log(`Error: ${JSON.stringify(err)}`));
  }

  getNamesForOption(users: any, pollOption: PollOption) {
    const voterIds = pollOption.voterIds || [];
    return voterIds.map(voterId => {
     const user = users[voterId];
     return user ? user.name : '';
    }).join(', ');
  }

}
