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
  fooditem: Fooditem;

  constructor(
    // private productService: ProductService,
    private dataService: DataService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // TODO: Unsubscribe the subscription to avoid memory leak.
    this.fooditem = this.route.snapshot.data['product'];
    console.log('Fooditem from resolver: ', this.fooditem);

    this.fooditems$ = this.dataService.getProductsByUser();
  }

}
