import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { AppUser } from '../core/models';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  currentUser: Observable<AppUser>;
  returnURL: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUser = this.auth.currUser;
  }

  loginGoogle() {
    this.auth.loginGogle();
   // console.log('TODO: Setup google login.');
  }

  loginAsGuest() {
    this.auth.loginAnonymously().then( res => {
    this.router.navigateByUrl(this.returnURL);
    });
  }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
