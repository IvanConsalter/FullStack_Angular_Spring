import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = `${environment.apiUrl}/oauth2/token`;
  oauthAuthorizeUrl = `${environment.apiUrl}/oauth2/authorize`;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login() {
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);

    const clientId = 'angular';
    const scope = 'read write';
    const responseType = 'code';

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'state=' + state,
      'redirect_uri=' + redirectURI
    ];

    window.location.href = this.oauthAuthorizeUrl + '?' +  params.join('&');
  }

  obterNovoAccessToken(): Promise<void> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken'));

    return this.http.post(this.oauthTokenUrl, payload, { headers })
      .toPromise()
      .then( (resposta: any) => {
        this.armazenarToken(resposta.access_token);
        this.armazenarRefreshToken(resposta.refresh_token);
        console.log('Novo access token criado!');
        return Promise.resolve();
      })
      .catch( (resposta) => {
        console.log('Erro ao renovar token: ', resposta);
        return Promise.resolve();
      });
  }

  obterNovoAccessTokenComCode(code: string, state: string): Promise<any> {
    const stateSalvo = localStorage.getItem('state');

    if (stateSalvo !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier');

    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', environment.oauthCallbackUrl)
      .append('code_verifier', codeVerifier);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post<any>(this.oauthTokenUrl, payload, { headers })
      .toPromise()
      .then((resposta: any) => {
        this.armazenarToken(resposta.access_token);
        this.armazenarRefreshToken(resposta.refresh_token);
        console.log('Novo access token criado!');

        localStorage.removeItem('state');
        localStorage.removeItem('codeVerifier');

        return Promise.resolve(null);
      })
      .catch((resposta: any) => {
        console.error('Erro ao gerar o token com o code.', resposta);
        return Promise.resolve();
      });

  }

  isAccessTokenInvalido(): any {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string): any {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any): boolean {
    for (const role of roles) {
      if(this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  armazenarRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private gerarStringAleatoria(tamanho: number) {
    let resultado = '';
    //Chars que são URL safe
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return resultado;
}
}
