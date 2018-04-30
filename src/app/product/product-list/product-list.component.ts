import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Fooditem } from '../../core/models';
import { Observable } from 'rxjs';
import { LayoutService, AppToolbar, FabAction } from '../../core/layout.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  matCards = Array(21);
  fooditems$: Observable<Fooditem[]>;

  constructor( private productService: ProductService, public layoutService: LayoutService) {

    const toolbar: AppToolbar = {
      showPageTitle: true,
      pageTitle: 'Foodz9',
      showSideNavToggleIcon: true,
      showAppTrayIcon: true,
      showNewProductIcon: true
    };

    const fabAction: FabAction = {
      showFabAction: true,
      fabAction: 'FAB_ACTION_SEARCH'
    };

    this.layoutService.appToolBar$.next(toolbar);
    this.layoutService.fabAction$.next(fabAction);
  }

  ngOnInit() {
    this.fooditems$ = this.productService.getProducts();
  }

}
