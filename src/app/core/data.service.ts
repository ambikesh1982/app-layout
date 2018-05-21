import { Injectable, Component } from '@angular/core';
// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
// rxjs imports
import { Observable, of } from 'rxjs';

// local imports
import { Fooditem, AppUser } from './models';
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

  // getProductsByUser(): Observable<Fooditem[]> {
  //   // TODO: Fetch the list of user uploads
  //   return of(Food);
  // }

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


  // <AppUser...>

  addUserDataToFirebase(user: AppUser) {
  // TODO: Upon login, add new user data to firebase for future use.
  console.log('AppUser data: ', user);
  }

  updateUserData (user: AppUser) {
    // TODO: Update user data stored in firebase.
    console.log('AppUser data: ', user);
  }

  deleteUser(uid: string) {
    // TODO: Delete user from firebase database.
    console.log('User deleted: ', uid);
  }

  // </AppUser...>

}
