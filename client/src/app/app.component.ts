import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'voting';

  constructor(private securityService: OidcSecurityService) { }

  ngOnInit() {
    if (window.location.hash) {
      this.securityService.onModuleSetup.subscribe(() => {
        this.securityService.authorizedCallback();
      });
    }
  }
}
