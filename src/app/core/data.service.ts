import { Injectable, Component } from '@angular/core';
// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
// rxjs imports
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// local imports
import { Fooditem } from './models';

@Injectable()
export class DataService {
  private productlistPath: string;
  private productlistRef: AngularFirestoreCollection<Fooditem>;

  constructor(private afs: AngularFirestore) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.productlistPath = 'foodListData';
    this.productlistRef = this.afs.collection<Fooditem>(this.productlistPath);
  }

  getProductList(): Observable<Fooditem[]> {
    return this.productlistRef.valueChanges();
  }

  getProductByID(productId: string): Observable<Fooditem> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).valueChanges();
  }

  updateProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).update(productId);
  }

}
