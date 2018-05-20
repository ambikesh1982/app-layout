import { Component, OnInit, Input } from '@angular/core';
import { Fooditem } from '../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: []
})
export class ProductCardComponent implements OnInit {

  @Input() fooditem: Fooditem;
  @Input() isDetailCard = false;
  previewURL: string;

  constructor() { }

  ngOnInit() {
  }

}
