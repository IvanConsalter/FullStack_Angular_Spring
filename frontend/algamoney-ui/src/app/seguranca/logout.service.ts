import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = `${environment.apiUrl}/token/revoke`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then( () => {
        this.authService.limparAccessToken();
      });
  }
}
