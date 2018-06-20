import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { AppUser } from '../core/models';
import { AppCartService } from './app-cart.service';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss']
})

export class AppCartComponent implements OnInit {

  currentUser: AppUser;
  cartID: string;
  cartItems$: Observable<ICartItem[]>;
  distinctSellers$: Observable<any>;
  sellers: {id: string, name: string}[] = [];

  constructor(
    private cartService: AppCartService,
    private auth: AuthService,
    private router: Router
  ) {
    this.currentUser = this.auth.currentUser;
    this.cartID = this.currentUser.uid;
  }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCartItems$(this.cartID);

    this.cartService.getDistinctSellers$(this.cartID)
    .subscribe( seller => {
      this.sellers.push(seller);
      console.log('Distict Sellers ####### ', this.sellers);
    });

  }

  removeSeller(event) {
    console.log('seller id to be removed: ', event);
    const seller = this.sellers.findIndex( sellers => sellers.id === event);
    console.log('seller id index: ', seller);
    this.sellers.splice(seller);
  }

  navigateToChatRoute( sellerID: string) {
    console.log('navigateToChatRoute(sellerID): ', sellerID);
    console.log('navigateToChatRoute(buyerID): ', this.cartID);
    this.router.navigate(['chat', this.cartID, sellerID]);

  }

  manageItemCount(data) {
    const count = data.item.quantity + data.count;
    if (count > 0) {
      this.cartService.updateItemQuantity(this.cartID, data.item.id, count);
    } else {
      this.deleteItem(data.item.id);
    }
  }

  deleteItem(itemID) {
    console.log('deleteItem(): event data: ', itemID);
    this.cartService.removeItemFromCart(this.cartID, itemID);
  }

  fabAction(event) {
    if (event === 'add') {
      this.router.navigate(['/']);
    } else {
      console.log('TODO: Navigate to checkout component.');
    }
  }

}
