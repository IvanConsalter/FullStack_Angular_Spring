import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class erroNaoAutenticado {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth2/token') && this.authService.isAccessTokenInvalido()) {
      return from(this.authService.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.authService.isAccessTokenInvalido()) {
              throw new erroNaoAutenticado();
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }

}
