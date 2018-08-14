import { Component, OnInit, OnDestroy } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of, BehaviorSubject, empty } from 'rxjs';
import { Poll } from '../models/poll';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { PollOption } from '../models/poll-option';
import { VoteService } from '../vote.service';
import { OidcSecurityService } from '../../../../node_modules/angular-auth-oidc-client';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit, OnDestroy {

  poll$: Observable<Poll>;
  triggerRefreshPoll$: BehaviorSubject<null>;
  currentlySelectedOption: string;

  errorMessage: string;

  constructor(private pollService: PollService, private route: ActivatedRoute, private voteService: VoteService,
    private securityService: OidcSecurityService) {}

  ngOnInit() {
    this.triggerRefreshPoll$ = new BehaviorSubject(null);
    this.poll$ = this.triggerRefreshPoll$.pipe(
      switchMap(() => {
        return this.route.paramMap.pipe(
          switchMap((params: ParamMap) => {
            const idParam = params.get('id');
            if (idParam) {
              return this.pollService.getPollDetails(idParam);
            }
            return of({ question: 'Poll not found', options: [] });
          })
        );
      }),
    tap(poll => {
      this.securityService.getIsAuthorized().subscribe(isAuthorized => {
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
    }, err => console.log(`Error: ${err}`), () => console.log('Complete!'));
  }

}
