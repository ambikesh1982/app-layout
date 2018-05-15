import { Injectable, Component } from '@angular/core';
// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
// rxjs imports
import { Observable, of } from 'rxjs';

// local imports
import { Fooditem } from './models';
// import { FOODITEMS } from './mock-data';
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

<<<<<<< HEAD

  getProductsByUser(productUser): Observable<Fooditem[]> {
    // TODO: Fetch the list of user uploads
    const productPath = `${this.productlistPath}/${productUser}`;
    return this.afs.doc<Fooditem[]>(productPath).valueChanges();
  }
=======
  // getProductsByUser(): Observable<Fooditem[]> {
  //   // TODO: Fetch the list of user uploads
  //   return of(Food);
  // }
>>>>>>> accd71c67991292d46981e4dcb2d68e9a0902a65

  async createProduct(fooditem: Fooditem, docID: string) {
    const promise = this.productlistRef.doc(docID).set(fooditem);

    await promise.then(res => {
      console.log('New fooditem created!!');
    }, err => {
      console.log('Error during create fooditem: ', err);
    });

  }

  // File upload methods

  getDownloadURL(imagePath: string) {
    const storageRef = this.storage.ref(imagePath);
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