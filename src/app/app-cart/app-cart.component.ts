import { Component, OnInit } from '@angular/core';
import { LayoutService, AppToolbar, FabAction } from '../core/layout.service';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss']
})
export class AppCartComponent implements OnInit {

  constructor( private layoutService: LayoutService) {
    const toolbar: AppToolbar = {
      showPageTitle: true,
      pageTitle: 'My Cart ( 5 ) : [ INR 370 ]',
      showGoBackIcon: true,
    };

    const fabAction: FabAction = {
      showFabAction: true,
      fabAction: 'FAB_ACTION_CART_DONE'
    };

    this.layoutService.appToolBar$.next(toolbar);
    this.layoutService.fabAction$.next(fabAction);
  }

  ngOnInit() {
  }

}
