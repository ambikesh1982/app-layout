import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, BehaviorSubject } from 'rxjs';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$: Observable<firebase.User>;
  private _appUser: firebase.User;
  private _isAnonymousUser$: Observable<boolean>;
  private _isSocialUser$ = new BehaviorSubject(false);

  constructor( private auth: AngularFireAuth) {
    this.auth.authState.subscribe( user => {
      if (user) {
        console.log('User loggedIn...', user.displayName);
      } else {
        console.log('User not logged in....');
      }
    });
   }


}
