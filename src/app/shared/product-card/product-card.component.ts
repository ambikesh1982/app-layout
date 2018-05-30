import { Component, OnInit, Input } from '@angular/core';
import { Fooditem } from '../../core/models';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: []
})
export class ProductCardComponent implements OnInit {

  @Input() fooditem: Fooditem;
  @Input() isDetailCard = false;
  previewURL: string;
  preveiwUrl$: Observable<string>;
  imageUrls$: Observable<string>[];

  constructor( private storage: AngularFireStorage) {
    this.imageUrls$ = [];
  }

  getFooditemImageUrl$(image: string): Observable<string> {
    return this.storage.ref(image).getDownloadURL();
  }

  ngOnInit() {
    this.imageUrls$ = this.fooditem.images.map( image => {
      return this.storage.ref(image).getDownloadURL();
    });
    this.preveiwUrl$ = this.imageUrls$[0];

  }

}
