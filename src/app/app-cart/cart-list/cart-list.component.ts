import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppCartService } from '../app-cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() sellerID: string;
  @Input() cartID: string;
  @Output() qtyChange = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  cartItemsBySellerID$: Observable<ICartItem[]>;


  constructor( private cartService: AppCartService) {
   }

  ngOnInit() {
    // this.cartItemsBySellerID = this.cartItems.filter(item => item.seller.id === this.sellerID);
    this.cartItemsBySellerID$ = this.cartService.getCartItemsBySeller$(this.cartID, this.sellerID);
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
