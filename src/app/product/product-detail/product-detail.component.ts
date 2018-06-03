import { Component, OnInit } from '@angular/core';
import { Fooditem } from '../../core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // fooditems$: Observable<Fooditem>; // To show more fooditems form the same user.
  fooditem: Fooditem;
  preview: string;
  fooditemImageCount: number;


  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // TODO: Unsubscribe the subscription to avoid memory leak.
    this.fooditem = this.route.snapshot.data['product'];
    this.fooditemImageCount = this.fooditem.images.length;
    console.log('Fooditem from resolver: ', this.fooditem);
    this.preview = this.fooditem.images[0].url;

    // this.imageUrls = this.fooditem.images.map(image => {
    //   return this.storage.ref(image).getDownloadURL();
    // });
    // this.preveiwUrl$ = this.imageUrls[0];

    // this.fooditems$ = this.dataService.getProductsByUser();
  }

}
