import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { Fooditem, AppUser } from '../core/models';
import { first, tap, map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppCartService {

  cartCollection: string;
  itemSubCollection: string;
  getCartSize$ = new BehaviorSubject(0);
  itemsRef: any;
  currentUser: AppUser;
  cartSize: number;


  constructor(private afs: AngularFirestore, private auth: AuthService) {
    console.log('From cartservice constructor');

    this.cartCollection = 'appcart';
    this.itemSubCollection = 'items';

    this.auth.currUser$.pipe(first()).subscribe(user => {
      if (user) {
        this.currentUser = user;

        this.itemsRef = this.afs
          .collection(this.cartCollection)
          .doc<ICart>(user.uid)
          .collection<ICartItem[]>(this.itemSubCollection);

        this.itemsRef.valueChanges().subscribe(
          items => {
            console.log('cartSize(): ', items.length);
            this.getCartSize$.next(items.length);
          }
        );
      } else {
        this.itemsRef = null;
        console.log('AppCartService: User not logged in.');
      }
    });
  }


  private cartExist(cartID: string) {
    return this.afs
      .collection(this.cartCollection)
      .doc(cartID)
      .valueChanges().pipe(
        first()
      ).toPromise();
  }

  private itemExist(cartID: string, itemID: string) {
    return this.afs
      .collection(this.cartCollection)
      .doc<ICart>(cartID)
      .collection<ICartItem>(this.itemSubCollection)
      .doc(itemID)
      .valueChanges().pipe(
        first()
      ).toPromise();
  }


  getCartItems$(cartID: string): Observable<ICartItem[]> {
    return this.afs
      .collection(this.cartCollection)
      .doc<ICart>(cartID)
      .collection<ICartItem>(this.itemSubCollection)
      .valueChanges();
  }

  manageAppCart(cartID: string, fooditem: Fooditem) {
    const itemPath = `${this.cartCollection}/${cartID}/${this.itemSubCollection}/${fooditem.id}`;
    const cartItem: ICartItem = {
      id: fooditem.id,
      seller: { id: fooditem.createdBy, name: 'abc' },
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
          this.updateItemQuantity(cartID, fooditem.id, item.quantity + 1);
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

  updateItemQuantity(cartID: string, itemID: string, count: number) {
    const itemPath = `${this.cartCollection}/${cartID}/${this.itemSubCollection}/${itemID}`;
    this.afs.doc(itemPath).update({ quantity: count }).then(() => {
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

  removeItemFromCart(cartID: string, itemID: string) {
    console.log('TODO: Remove item from the cart');
    const itemPath = `${this.cartCollection}/${cartID}/${this.itemSubCollection}/${itemID}`;
    this.afs.doc(itemPath).delete()
      .then( () => {
        console.log(itemID, ' deteled from the cart');
      }).catch(e => console.log('Error while updating item quantity: ', e));
  }

}
