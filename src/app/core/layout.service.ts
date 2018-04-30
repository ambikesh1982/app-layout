import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';

export interface AppToolbar {
  pageTitle?: string;
  showPageTitle?: boolean;
  showSideNavToggleIcon?: boolean;
  showNewProductIcon?: boolean;
  showAppTrayIcon?: boolean;
  showCancelIcon?: boolean;
  showGoBackIcon?: boolean;
}

export interface FabAction {
  fabAction?: string;
  showFabAction: boolean;
}

@Injectable()
export class LayoutService {

  defaultToolbar: AppToolbar = {
    pageTitle: 'Foodz9',
    showPageTitle: true,
    showSideNavToggleIcon: true,
    showNewProductIcon: true,
    showAppTrayIcon: true,
    showCancelIcon: false,
    showGoBackIcon: false
  };

  defaultFabAction: FabAction = {
    fabAction: 'FAB_ACTION_SEARCH',
    showFabAction: true,
  };

  fabAction$ = new BehaviorSubject<FabAction>(this.defaultFabAction);
  appToolBar$ = new BehaviorSubject<AppToolbar>(this.defaultToolbar);

  constructor() { }

}

    // this.setDefaultPageLayout(this.pageTitle, this.fabAction);
    // this.resetLayout();
    // _router.events
    //   .filter((event) => event instanceof NavigationEnd)
    //   .map(() => this.activatedRoute)
    //   .map((route) => {
    //     if (route.firstChild) {
    //       route = route.firstChild;
    //     }
    //     return route;
    //   })
    //   .filter((route) => route.outlet === 'primary')
    //   .mergeMap((route) => route.data)
    //   .subscribe((data: Data) => {
    //     switch (data.title) {
    //       case 'PRODUCT_LIST_PAGE':
    //         this.newProductPageLayout();
    //         break;
    //       case 'PRODUCT_DETAIL_PAGE':
    //         this.newProductPageLayout();
    //         break;
    //       case 'PRODUCT_ADD_NEW_PAGE':
    //         this.newProductPageLayout();
    //         break;
    //       default:
    //         this.setDefaultPageLayout();
    //         break;
    //     }
    //   });

  // private setDefaultPageLayout(pageTitle?: string, fabAction?: string) {
  //   this.resetLayout();
  //   this.pageTitle = pageTitle;
  //   this.fabAction$.next(fabAction);
  //   this.showPageTitle = true;
  //   this.showSideNavToggleIcon = true;
  //   this.showNewProductIcon = true;
  //   this.showAppTrayIcon = true;
  //   this.showFabAction = true;
  // }

  // setListPageLayout(pageTitle: string, fabAction: string) {
  //   this.resetLayout();
  //   this.setDefaultPageLayout(pageTitle, fabAction);
  // }

  // setDetailPageLayout(pageTitle: string, fabAction: string) {
  //   this.resetLayout();
  //   this.pageTitle = pageTitle;
  //   this.fabAction$.next(fabAction);
  //   this.showPageTitle = true;
  //   this.showFabAction = true;
  //   this.showGoBackIcon = true;
  //   this.showAppTrayIcon = true;
  // }

  // setAddNewPageLayout(pageTitle: string, fabAction: string) {
  //   this.resetLayout();
  //   this.pageTitle = pageTitle;
  //   this.fabAction$.next(fabAction);
  //   this.showPageTitle = true;
  //   this.showFabAction = true;
  //   this.showCancelIcon = true;
  // }


  // private resetLayout() {
  //   this.showPageTitle = false;
  //   this.showSerachBox = false;
  //   this.showSideNavToggleIcon = false;
  //   this.showNewProductIcon = false;
  //   this.showAppTrayIcon = false;
  //   this.showCancelIcon = false;
  //   this.showGoBackIcon = false;
  //   this.showFabAction = true;
  //   this.showFooterToolbar = false;
  // }





