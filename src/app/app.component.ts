import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  loading: boolean;
  subscription: Subscription;

  navList = [
    { menuIcon: 'home', menuName: 'Home', menuRoute: 'list' },
    { menuIcon: 'order', menuName: 'My Orders', menuRoute: 'addnew' },
    { menuIcon: 'cart', menuName: 'Cart', menuRoute: './' },
    { menuIcon: 'heart', menuName: 'Wish List', menuRoute: './' },
    { menuIcon: 'language', menuName: 'Language', menuRoute: './' },
    { menuIcon: 'download', menuName: 'Download App', menuRoute: './' },
    { menuIcon: 'help', menuName: 'Help', menuRoute: './' },
    { menuIcon: 'feedback', menuName: 'Feedback', menuRoute: './' },
  ];

  constructor( private router: Router, private auth: AuthService) {
    this.loading = true;

    this.subscription = router.events.subscribe( routerEvent => {
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
    this.auth.signOut();
    this.auth.currentUser.subscribe(
      user => {
        if (user != null) {
          console.log('Current User: ', user);
        } else {
          console.log('### User not found - Creating new anonymous user ###');
          this.auth.loginAnonymously();
        }

      }
    );
    // this.auth.loginAnonymously();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  }
