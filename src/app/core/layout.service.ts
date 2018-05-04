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

  fabActionIcon$ = new BehaviorSubject<string>('search');

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
    ).subscribe((data) => {
      console.log('Router data: ', data);
      this.setPageLayout(data.title);
      });
   }

   setPageLayout(page: string) {
     switch (page) {
       case 'PRODUCT_LIST_PAGE':
        this.fabActionIcon$.next('search');
        this.appToolBar$.next(this.defaultToolbar);
         break;
       case 'PRODUCT_DETAIL_PAGE':
         this.fabActionIcon$.next('shopping_basket');
         this.appToolBar$.next(this.cancelToolbar);
         break;
       case 'PRODUCT_NEW_PAGE':
         this.fabActionIcon$.next('arrow_forward');
         this.appToolBar$.next(this.cancelToolbar);
         break;
       case 'APP_CART_PAGE':
         this.fabActionIcon$.next('done');
         this.appToolBar$.next(this.cancelToolbar);
         break;
       default:
         this.fabActionIcon$.next('arrow_forward');
         this.appToolBar$.next(null);
         break;
     }

   }
  }

