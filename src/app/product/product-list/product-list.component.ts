import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Fooditem } from '../../core/models';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { DataService } from '../../core/data.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  matCards = Array(21);
  fooditems$: Observable<Fooditem[]>;

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
    // this.fooditems$ = this.productService.getProducts();
    this.fooditems$ = this.dataService.getProductList();
  }

}
