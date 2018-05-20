import { Component, OnInit } from '@angular/core';
import { Fooditem } from '../../core/models';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  fooditems: Observable<Fooditem[]>;

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
    // Unwrapped fooditems coming directly from route resolver.
    // See product.module.ts file.
    // this.fooditems = this.route.snapshot.data['products'];
    this.fooditems = this.dataService.getProductList();
  }
}
