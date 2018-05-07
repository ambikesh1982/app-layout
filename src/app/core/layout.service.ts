import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface AppToolbar {
  pageTitle?: string;
  showSideNavToggleIcon?: boolean;
  showNewProductIcon?: boolean;
  showAppTrayIcon?: boolean;
  showCancelIcon?: boolean;
  showGoBackIcon?: boolean;
}

export interface FabButton {
  fabPage: string;
  fabIcon: string;
}

@Injectable()
export class LayoutService {

  defaultToolbar: AppToolbar = {
    pageTitle: 'Foodz9',
    showSideNavToggleIcon: true,
    showNewProductIcon: true,
    showAppTrayIcon: true,
  };

  cancelToolbar: AppToolbar = {
    pageTitle: 'Fooditem details!',
    showCancelIcon: true,
  };

  appToolBar$ = new BehaviorSubject<AppToolbar>(this.defaultToolbar);
  fabButton$ = new BehaviorSubject<FabButton>(null);

  constructor(private _router: Router, private activatedRoute: ActivatedRoute) {
    _router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        if (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((route_data) => {
      console.log('Router data: ', route_data);
      this.setPageLayout(route_data);
      });
   }

   setPageLayout(routerData: any) {
     switch (routerData.title) {
       case 'PRODUCT_LIST_PAGE':
         this.fabButton$.next({ fabPage: routerData.title, fabIcon: 'search'});
        this.appToolBar$.next(this.defaultToolbar);
         break;
       case 'PRODUCT_DETAIL_PAGE':
         this.fabButton$.next({ fabPage: routerData.title, fabIcon: 'shopping_basket'});
         this.appToolBar$.next({
           pageTitle: routerData.product.title,
           showCancelIcon: true});
         break;
       case 'PRODUCT_NEW_PAGE':
         this.fabButton$.next({ fabPage: routerData.title, fabIcon: 'arrow_forward'});
         this.appToolBar$.next({
           pageTitle: 'New fooditem',
           showCancelIcon: true
         });
         break;
       case 'APP_CART_PAGE':
         this.fabButton$.next({ fabPage: routerData.title, fabIcon: 'done'});
         this.appToolBar$.next(this.cancelToolbar);
         break;
       default:
         this.fabButton$.next({ fabPage: routerData.title, fabIcon: 'arrow_forward'});
         this.appToolBar$.next(this.cancelToolbar);
         break;
     }

   }
  }

