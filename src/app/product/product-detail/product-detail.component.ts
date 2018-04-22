import { Component, OnInit } from '@angular/core';
import { LayoutService, AppToolbar, FabAction } from '../../core/layout.service';
import { ProductService } from '../../core/product.service';
import { Fooditem } from '../../core/models';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  fooditem$: Observable<Fooditem>;
  fooditems$: Observable<Fooditem[]>;
  productID: string;

  constructor( private layoutService: LayoutService,
  private productService: ProductService,
    private route: ActivatedRoute) {

    const toolbar: AppToolbar = {
      showPageTitle: true,
      pageTitle: 'Fooditem details!',
      showCancelIcon: true,
    };

    const fabAction: FabAction = {
      showFabAction: true,
      fabAction: 'FAB_ACTION_ADD2CART'
    };

    this.layoutService.appToolBar$.next(toolbar);
    this.layoutService.fabAction$.next(fabAction);
      this.productID = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.fooditem$ = this.productService.getProductByID(+this.productID);
    this.fooditems$ = this.productService.getProductsByUser();

  }

}
