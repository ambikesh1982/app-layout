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

@Injectable()
export class DataService {
  private appUserPath: string;
  private chatroomPath: string;
  private productlistPath: string;
  private appUserRef: AngularFirestoreCollection<AppUser>;
  private productlistRef: AngularFirestoreCollection<Fooditem>;
  private chatRoomRef: AngularFirestoreCollection<ChatMessage>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.appUserPath = 'appUsers';
    this.productlistPath = 'foodListData';
    this.chatroomPath = 'chat-data';
    this.appUserRef = this.afs.collection<AppUser>(this.appUserPath);
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

  updateProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).update(productId);
  }

  deleteProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).delete();
  }

  // <Storage...>


  // </Storage...>

  gettimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

// Chat Component Menthods Start

  // Chat Component Menthods Start

  async createChatMessages(newMessage: ChatMessage, fooditem: Fooditem, buyerId: string) {

        console.log('buyerId',buyerId);

        const sellerId = 'sellerid-dummy'; // fooditem.createdBy;
        const fooditemId = fooditem.id;
        // newMessage.messageId = newRoomId;
        newMessage.msgCreatedAt = this.gettimestamp();
        console.log('in-dataservice-chatMessaage', newMessage);

        this.chatRoomRef.doc(`${fooditemId}`).collection(`${sellerId}`).add(newMessage)
          .then(
          result => {
            console.log('first time login, created new room', result);
          },
          err => console.error(err, 'You do not have access!')
          );
      
  }


  getRoomMessages(fooditem: Fooditem): Observable<ChatMessage[]> {
    const sellerId = 'sellerid-dummy';
    const fooditemId = fooditem.id;
    console.log('getroommessage data', fooditem);
    return this.chatRoomRef.doc(`${fooditemId}`).collection<ChatMessage>(`${sellerId}`, ref => ref.orderBy('msgCreatedAt')).valueChanges();
    //  return this.chatRoomRef.doc('fooditemId').collection<ChatMessage>(`${sellerId}`, ref => ref.orderBy('msgCreatedAt')).valueChanges();

  }


  removeRoom(chatroom: ChatMessage): Promise<any> {
    const roomPath = `${this.chatroomPath}/${chatroom.createdByUserId}`;
    return this.afs.doc<ChatMessage>(roomPath).delete();
  }

  // Chat Component Menthods Ends here

  // <AppUser...>

  getUserFromFirestore(uid: string) {
    const appUserPath = `${this.appUserPath}/${uid}`;
    return this.afs.doc<AppUser>(appUserPath).valueChanges();
  }

  async saveUserDataToFirestore(user: AppUser) {
    const promise = this.appUserRef.doc(user.uid).set(user);
    await promise.then(res => {
      console.log('saveUserDataToFirebase(user): ', user);
      console.log('New User Saved!!');
    }, err => {
      console.log('Error during create User: ', err);
    });
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
