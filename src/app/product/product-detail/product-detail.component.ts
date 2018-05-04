import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Fooditem } from '../../core/models';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../core/data.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  fooditem$: Observable<Fooditem>;
  fooditems$: Observable<Fooditem[]>;

  constructor(
    // private productService: ProductService,
    private dataService: DataService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // TODO: Unsubscribe the subscription to avoid memory leak.
    this.route.paramMap.subscribe((routerParam: ParamMap) => {
      const productID = routerParam.get('id');
      // this.fooditem$ = this.productService.getProductByID(+productID);
      this.fooditem$ = this.dataService.getProductByID(productID);
      console.log('ProdId---', productID);

    });

    this.fooditem$.subscribe(fooditem => {
      console.log('Title', fooditem.title);
    });

    this.fooditems$ = this.dataService.getProductsByUser();
  }

}
