import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { Fooditem } from '../core/models';
import { first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppCartService {

  cartCollection: string;
  itemSubCollection: string;
  cartSize$ = new BehaviorSubject(0);

  constructor(private afs: AngularFirestore) {
    this.cartCollection = 'appcart';
    this.itemSubCollection = 'items';
  }

  getCartItems(cartID: string): Observable<ICartItem[]> {
    return this.afs
      .collection(this.cartCollection)
      .doc<ICart>(cartID)
      .collection<ICartItem>(this.itemSubCollection)
      .valueChanges();
  }

  private itemExistinCart(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }

  manageAppCart(cartID: string, fooditem: Fooditem) {
    const itemPath = `${this.cartCollection}/${cartID}/${this.itemSubCollection}/${fooditem.id}`;
    const cartItem: ICartItem = {
      id: fooditem.id,
      seller: {id: fooditem.createdBy, name: 'abc'},
      title: fooditem.title,
      url: fooditem.images[0].url,
      price: fooditem.price,
      quantity: 1
    };

    this.afs.doc(itemPath).valueChanges().pipe(
      first(),
      tap((item: ICartItem) => {
        if (item) {
          console.log('Item already present in the cart. Increment the item counter: ', item.quantity);
          this.updateItemQuantity(itemPath, item.quantity + 1);
        } else {
          console.log('Item not present, adding it to the cart: ');
          this.addItemToTheCart(itemPath, cartItem);
        }
      })
    ).subscribe();
  }

  intializeCart(cartID: string) {
    const newCart = {
      status: 'active',
      userID: cartID,
      cartSize: 0,
      cartValue: 0.0,
      cartDiscount: 0.0
    };
    this.afs.collection(this.cartCollection).doc(cartID).set(newCart);
  }

  private updateItemQuantity(path: string, count: number) {
    this.afs.doc(path).update({ quantity: count }).then(() => {
      console.log('Item quantity updated');
    }).catch(e => {
      console.log('Error while updating item quantity: ', e);
    });
  }

  private addItemToTheCart(path: string, item: ICartItem) {
    this.afs.doc(path).set(item).then(() => {
      console.log('Fooditem added to the Cart');
    }).catch(e => {
      console.log('Error while adding item to the Cart: ', e);
    });
  }

  removeItemFromCart(id: string) {
    console.log('TODO: Remove item from the cart');
  }

}
