import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PollService } from './poll.service';

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration, AuthWellKnownEndpoints } from 'angular-auth-oidc-client';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthInterceptor } from './auth-interceptor';
import { PollsModule } from './polls/polls.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PollsModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: [
    AppComponent,
    CreatePollComponent,
    SignInComponent,
  ],
  providers: [
    OidcSecurityService,
    PollService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private httpClient: HttpClient) {

    this.httpClient.get('./assets/google-well-known.config.json').subscribe(response => {
      console.log('Acquired wellknown config');
      console.log(response);

      const openIdImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIdImplicitFlowConfiguration.stsServer = 'https://accounts.google.com';
      openIdImplicitFlowConfiguration.redirect_url = 'http://localhost:4200';
      openIdImplicitFlowConfiguration.client_id = '944030115409-tvekc3cn2pedeskcm5m1rnt7epq2tjpc.apps.googleusercontent.com';
      openIdImplicitFlowConfiguration.response_type = 'id_token token';
      openIdImplicitFlowConfiguration.scope = 'openid email';
      openIdImplicitFlowConfiguration.post_logout_redirect_uri = '/';
      openIdImplicitFlowConfiguration.post_login_route = '/';
      openIdImplicitFlowConfiguration.forbidden_route = '/forbidden';
      openIdImplicitFlowConfiguration.unauthorized_route = 'unauthorized';
      openIdImplicitFlowConfiguration.log_console_debug_active = true;
      openIdImplicitFlowConfiguration.log_console_warning_active = true;
      openIdImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 30;

      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(response);
      console.log(authWellKnownEndpoints);

      this.oidcSecurityService.setupModule(openIdImplicitFlowConfiguration, authWellKnownEndpoints);
    });
  }
}
