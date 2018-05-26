// Common Error Codes
// auth / app - deleted
// auth / app - not - authorized
// auth / argument - error
// auth / invalid - api - key
// auth / invalid - user - token
// auth / network - request - failed
// auth / operation - not - allowed
// auth / requires - recent - login
// auth / too - many - requests
// auth / unauthorized - domain
// auth / user - disabled
// auth / user - token - expired
// auth / web - storage - unsupported

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

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._appUser = user;
        console.log('User loggedIn...', user.displayName);
      } else {
        console.log('User not logged in....');
      }
    });
  }

  loginAnonymously() {
    console.log('#Event: signInAnonymous()#');
    this.afAuth.auth.signInAnonymously()
      .then(user => {
        console.log('loginAnonymously(): Sign in successfull...', user);
      })
      .catch(
        (e: firebase.FirebaseError) => {
          if (e.code === 'auth/operation-not-allowed') {
            console.log('Error: loginAnonymously()...Anonymous auth not enabled in the Firebase Console.');

          } else {
            console.error('Error: loginAnonymously()...', e.code);
            console.error('Error: loginAnonymously()...', e.message);
          }
        });
  }
  get currentUser1() {
    return this._appUser.uid;
  }

  loginGogle() {}

  upgradeAnonymousUser() {
    // TODO: Upgrade anonymous user to google.
  }

  signOut() {
    this.afAuth.auth.signOut();
}


}
