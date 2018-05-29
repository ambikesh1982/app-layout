import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

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

  constructor(private _router: Router, private activatedRoute: ActivatedRoute) {

    // this._router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this._router),
    // ).subscribe(res => {
    //   console.log('res.url: ', res.url);
    //   console.log(this.getAbsolutePath(res.url));
    // });

    _router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      // map(route => {
      //     while (route.firstChild) {
      //       route = route.firstChild;
      //       return route;
      //     }
      //   }),
      // filter((route) => route.outlet === 'primary'),
      // mergeMap((route) => route.data),
      // mergeMap(data => data.title)
    ).subscribe((route_data) => {
      console.log('Router data: ', route_data);
      this.setPageLayout(route_data);
    });
  }

  // getAbsolutePath(url: string): string {
  //   const idx = url.lastIndexOf('/');
  //   if (idx !== -1) {
  //     return url.slice(0, idx);
  //   } else {
  //     return url;
  //   }
  // }

  setPageLayout(routerData: any) {
    switch (routerData.title) {
      case 'PRODUCT_LIST_PAGE':
        // this.fabButton$.next({
        //   fabPage: routerData.title,
        //   fabIcon: 'search'
        // });
        this.appToolBar$.next(this.defaultToolbar);
        break;
      case 'PRODUCT_DETAIL_PAGE':
        // this.fabButton$.next({
        //   fabPage: routerData.title,
        //   fabIcon: 'shopping_basket'
        // });
        this.appToolBar$.next({
          pageTitle: routerData.product.title,
          showCancelIcon: true
        });
        break;
      case 'PRODUCT_NEW_PAGE':
        // this.fabButton$.next({
        //   fabPage: routerData.title,
        //   fabIcon: 'arrow_forward'
        // });
        this.appToolBar$.next({
          pageTitle: 'New fooditem',
          showCancelIcon: true
        });
        break;
      case 'APP_CART_PAGE':
        // this.fabButton$.next({
        //   fabPage: routerData.title,
        //   fabIcon: 'done'
        // });
        this.appToolBar$.next(this.cancelToolbar);
        break;
      default:
        // this.fabButton$.next({
        //   fabPage: routerData.title,
        //   fabIcon: 'arrow_forward'
        // });
        this.appToolBar$.next(this.defaultToolbar);
        break;
    }

  }
}

