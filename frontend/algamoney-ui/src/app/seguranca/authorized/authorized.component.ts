import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.authService.obterNovoAccessTokenComCode(params.code, params.state)
          .then( () => {
            this.router.navigate(['/']);
          })
          .catch( (error: any) => {
            console.error('Erro no callback: ', error);
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
