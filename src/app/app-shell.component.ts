import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
import { AppUser } from './core/models';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  title = '';
  currentUser: Observable<AppUser>;


  navList = [
    { menuIcon: 'home', menuName: 'Home', menuRoute: './' },
    { menuIcon: 'order', menuName: 'My Orders', menuRoute: 'product/addnew' },
    { menuIcon: 'cart', menuName: 'Cart', menuRoute: './' },
    { menuIcon: 'heart', menuName: 'Wish List', menuRoute: './' },
    { menuIcon: 'language', menuName: 'Language', menuRoute: './' },
    { menuIcon: 'download', menuName: 'Download App', menuRoute: './' },
    { menuIcon: 'help', menuName: 'Help', menuRoute: './' },
    { menuIcon: 'feedback', menuName: 'Feedback', menuRoute: './' },
  ];

  constructor( private auth: AuthService ) {
  }



  ngOnInit() {
    this.currentUser = this.auth.currUser$;
    this.currentUser.pipe(
      map(
        user => {
          if (user != null) {
            console.log('Current User: ', user);
          } else {
            console.log('### User not found - Creating new anonymous user ###');
            this.auth.loginAnonymously();
          } // else
        } // user
      ) // map
    ); // pipe
  } // ngOnInit


  loginAsGuest() {
    this.auth.loginAnonymously();
  }

  loginGoogle() {
    this.auth.loginGogle();
  }

}

