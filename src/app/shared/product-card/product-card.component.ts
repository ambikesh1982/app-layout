import { Component, OnInit, Input } from '@angular/core';
import { Fooditem } from '../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: ['img { height: 33vh; margin-bottom: 0;}']
})
export class ProductCardComponent implements OnInit {

  @Input() fooditem: Fooditem;

  constructor() { }

  ngOnInit() {
  }

}
