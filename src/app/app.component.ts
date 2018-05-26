import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Subscription, Observable } from 'rxjs';
import { AppUser } from './core/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  loading: boolean;
  currentUser: Observable<AppUser>;
  subscription: Subscription;

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

  constructor(private router: Router, private auth: AuthService) {
    this.loading = true;

    this.auth.signOut();

    this.subscription = router.events.subscribe(routerEvent => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: any): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.currentUser = this.auth.currUser;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
