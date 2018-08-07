import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private securityService: OidcSecurityService, private httpClient: HttpClient) { }

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
