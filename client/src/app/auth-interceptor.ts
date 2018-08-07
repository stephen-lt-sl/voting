import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityService: OidcSecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.securityService.getIdToken();
    if (token === '') {
      return next.handle(req);
    }
    const authenticatedReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(authenticatedReq);
  }
}
