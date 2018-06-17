import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() cartItems: ICartItem[];

  constructor() { }

  ngOnInit() {
  }

  icrementItemCount(id: string) {
    console.log('TODO: updateItemQuantity(path: string, count: number): ', id);
  }

  decrementItemCount(id: string) {
    console.log('TODO: updateItemQuantity(path: string, count: number): ', id);
  }

  removeItem(id: string) {
    console.log('TODO: removeItemFromCart(id: string): ', id);
  }

}
