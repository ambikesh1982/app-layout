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

  constructor( private storage: AngularFireStorage) { }

  ngOnInit() {
  }

}
