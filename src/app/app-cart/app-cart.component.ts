import { Component, OnInit } from '@angular/core';
import { AppCartService } from './app-cart.service';
import { AuthService } from '../core/auth.service';
import { AppUser, Fooditem } from '../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss']
})
export class AppCartComponent implements OnInit {

  currentUser: AppUser;
  cartID: string;

  cartItems$: Observable<ICartItem[]>;

  constructor( private cartService: AppCartService, private auth: AuthService) {
    this.currentUser = this.auth.currentUser;
    this.cartID = this.currentUser.uid;
  }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCartItems(this.cartID);
  }

}
