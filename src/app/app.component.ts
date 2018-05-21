import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  loading: boolean;

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
    router.events.subscribe( routerEvent => {
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
    this.auth.loginAnonymously();
  }

  }
