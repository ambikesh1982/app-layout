import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() cartItems: ICartItem[];
  @Output() qtyChange = new EventEmitter();
  @Output() deleteItem = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  icrementItemCount(item: ICartItem) {
    console.log('TODO: updateItemQuantity(path: string, count: number): ', item);
    this.qtyChange.emit({count: 1, item: item});
  }

  decrementItemCount(item: ICartItem) {
    this.qtyChange.emit({ count: -1, item: item });
    console.log('TODO: updateItemQuantity(path: string, count: number): ', item);
  }

  removeItem(id: string) {
    this.deleteItem.emit(id);
    console.log('TODO: removeItemFromCart(id: string): ', id);
  }

}
