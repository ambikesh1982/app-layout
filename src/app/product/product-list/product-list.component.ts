import { Component, OnInit } from '@angular/core';
import { Fooditem } from '../../core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  fooditems: Fooditem[];

  constructor( private route: ActivatedRoute ) {
  }

  ngOnInit() {
    // Unwrapped fooditems coming directly from route resolver.
    // See product.module.ts file.
    this.fooditems = this.route.snapshot.data['products'];
  }

}
