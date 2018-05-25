// Common Error Codes
// auth/app-deleted
// auth/app-not-authorized
// auth/argument-error
// auth/invalid-api-key
// auth/invalid-user-token
// auth/network-request-failed
// auth/operation-not-allowed
// auth/requires-recent-login
// auth/too-many-requests
// auth/unauthorized-domain
// auth/user-disabled
// auth/user-token-expired
// auth/web-storage-unsupported

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { DataService } from './data.service';
import { AppUser } from './models';

interface User {
  uid: string;
  isAnonymous: boolean;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _user$: Observable<firebase.User>;
  private _appUser: firebase.User;
  private _isAnonymousUser$: Observable<boolean>;
  private _isSocialUser$ = new BehaviorSubject(false);

  isAnonymous: boolean;
  currentUser: Observable<AppUser | null>;

  constructor(private afAuth: AngularFireAuth, private dataService: DataService) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          console.log('### Retrieving user from firestore ###');
          return this.dataService.getUserFromFirestore(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  loginAnonymously(): Promise<void> {
    console.log('#Event: loginAnonymously()#');
    return this.afAuth.auth.signInAnonymously()
      .then( user => {

        const anomymousUser: AppUser = {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
        };
        // Save user data to fireabase...
        console.log('loginAnonymously(): Sign in successfull...');
        return this.dataService.saveUserDataToFirestore(anomymousUser);
      })
      .catch(
        ( e: firebase.FirebaseError) => {
          this.handleAuthErrors(e);
          // return of(null);
        });
  }

  loginGogle() {}

  upgradeAnonymousUser() {
    // TODO: Upgrade anonymous user to google.
  }

  signOut() {
    this.afAuth.auth.signOut();
}

handleAuthErrors(e: firebase.FirebaseError) {
// Firebase Auth Error Codes...
  // auth/app-deleted
  // auth/app-not-authorized
  // auth/argument-error
  // auth/invalid-api-key
  // auth/invalid-user-token
  // auth/network-request-failed
  // auth/operation-not-allowed
  // auth/requires-recent-login
  // auth/too-many-requests
  // auth/unauthorized-domain
  // auth/user-disabled
  // auth/user-token-expired
  // auth/web-storage-unsupported
  switch (e.code) {
    case 'auth/operation-not-allowed':
      console.log('Error: loginAnonymously()...Anonymous auth not enabled in the Firebase Console.');
      break;
    default:
      console.error('Error: loginAnonymously()...', e.code);
      console.error('Error: loginAnonymously()...', e.message);
      break;
  }

}


}
