import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Subscription, Observable } from 'rxjs';
import { AppUser } from './core/models';
import { map } from 'rxjs/operators';
import { LayoutService } from './core/layout.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="loading">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  loading: boolean;
  currentUser: Observable<AppUser>;
  subscription: Subscription;

  constructor(private router: Router, private layoutService: LayoutService) {
    this.loading = true;

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
  } // ngOnInit

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
