import { Injectable, Component } from '@angular/core';
// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
// rxjs imports
import { Observable, of } from 'rxjs';

// local imports

import { Fooditem, ChatMessage, AppUser } from './models';

// import { FOODITEMS } from './mock-data';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {
  private chatroomPath: string;
  private productlistPath: string;
  private productlistRef: AngularFirestoreCollection<Fooditem>;
  private chatRoomRef: AngularFirestoreCollection<ChatMessage>;

  private cuurentUser: firebase.User;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.productlistPath = 'foodListData';
    this.chatroomPath = 'chat-data';
    this.productlistRef = this.afs.collection<Fooditem>(this.productlistPath);
    this.chatRoomRef = this.afs.collection<ChatMessage>(this.chatroomPath);
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

  gettimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

// Chat Component Menthods Start

  async createChatMessages(newMessage: ChatMessage, foodId: string): Promise<string> {

    const newRoomId  =  this.authService.currentUser1(); // this.afs.createId(); buyer+Sellerid
    newMessage.messageId = newRoomId;
    newMessage.msgCreatedAt = this.gettimestamp();
    const promise = this.chatRoomRef.doc(`${foodId}`).collection(`${newRoomId}`).doc<ChatMessage>().set(newMessage);
    await promise
      .then(
      result => {
        console.log('first time login, created new room', result);
      },
      err => console.error(err, 'You do not have access!')
      );

    return newRoomId;
  }


  getRoomMessages(): Observable<ChatMessage[]> {
    return this.chatRoomRef.doc('chat-room').collection<ChatMessage>('Authid', ref => ref.orderBy('msgCreatedAt')).valueChanges();
  }


  removeRoom(chatroom: ChatMessage): Promise<any> {
    const roomPath = `${this.chatroomPath}/${chatroom.createdByUserId}`;
    return this.afs.doc<ChatMessage>(roomPath).delete();
  }

  // Chat Component Menthods Ends here

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
