import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from '../../../../node_modules/angular-auth-oidc-client';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private securityService: OidcSecurityService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.securityService.getIsAuthorized();
  }

  login() {
    this.securityService.authorize();
  }

  logout() {
    this.securityService.logoff();
  }

}
