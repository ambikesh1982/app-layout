import { Injectable, Component } from '@angular/core';
// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
// rxjs imports
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// local imports
import { Fooditem } from './models';
import { FOODITEMS } from './mock-data';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';

@Injectable()
export class DataService {
  private productlistPath: string;
  private productlistRef: AngularFirestoreCollection<Fooditem>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.productlistPath = 'foodListData';
    this.productlistRef = this.afs.collection<Fooditem>(this.productlistPath);
  }

  // product methods

  getFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  getProductList(): Observable<Fooditem[]> {
    return this.productlistRef.valueChanges();
  }

  getProductByID(productId: string): Observable<Fooditem> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).valueChanges();
  }

  getProductsByUser(): Observable<Fooditem[]> {
    // TODO: Fetch the list of user uploads
    return of(FOODITEMS);
  }

  updateProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).update(productId);
  }

  deleteProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).delete();
  }

  // <Storage...>

  uploadImage(imageFile: File, storagePath: string): Observable<UploadTaskSnapshot> {
    const task = this.storage.upload(storagePath, imageFile);
    return task.snapshotChanges();
  }
  // </Storage...>

}
