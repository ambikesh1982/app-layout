import { Injectable } from '@angular/core';

// Firebase imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import * as firebase from 'firebase/app';

// rxjs imports
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// local imports
import { Fooditem, ChatMessage, AppUser, ChatRoomInfo } from './models';


const APP_ROOT_COLLECTIONS = {
  'PRODUCTS': 'products',
  'USERS': 'appusers',
  'CHATS': 'appchats',
};

@Injectable()
export class DataService {
  private appUserPath:     string;
  private chatroomPath:    string;
  private productlistPath: string;
  private chatMessages: Observable<ChatMessage[]>;
  private appUserRef:     AngularFirestoreCollection<AppUser>;
  private productlistRef: AngularFirestoreCollection<Fooditem>;
  private chatRoomRef:    AngularFirestoreCollection<ChatMessage>;
  FooditemID$: BehaviorSubject<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.FooditemID$ = new BehaviorSubject(null);

    this.appUserPath = APP_ROOT_COLLECTIONS['USERS'];
    this.productlistPath = APP_ROOT_COLLECTIONS['PRODUCTS'];
    this.chatroomPath = APP_ROOT_COLLECTIONS['CHATS'];

    this.appUserRef = this.createFirestoreCollectionRef(APP_ROOT_COLLECTIONS['USERS']);
    this.productlistRef = this.createFirestoreCollectionRef(APP_ROOT_COLLECTIONS['PRODUCTS']);
    this.chatRoomRef = this.createFirestoreCollectionRef(APP_ROOT_COLLECTIONS['CHATS']);

  }

  // #### Generic method to create Collection references. ####

  createFirestoreCollectionRef(collectionPath: string): AngularFirestoreCollection<any> {
    return this.afs.collection<any>(collectionPath);
  }  // createFirestoreCollectionRef

  getFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // #### product methods ####



  getProductList(): Observable<Fooditem[]> {
    this.productlistRef.ref.orderBy('createdAt', 'desc');
    return this.afs.collection<Fooditem>
      (APP_ROOT_COLLECTIONS['PRODUCTS'], ref => ref.orderBy('createdAt', 'desc')).valueChanges();
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

  updateProduct(fooditem: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${fooditem.id}`;
    return this.afs.doc<Fooditem>(productPath).update(fooditem);
  }

  deleteProduct(productId: Fooditem): Promise<any> {
    const productPath = `${this.productlistPath}/${productId}`;
    return this.afs.doc<Fooditem>(productPath).delete();
  }

  // <Storage...>


  // </Storage...>



// Chat Component Menthods Start

  // Chat Component Menthods Start

  async createChatMessages(newMessage: ChatMessage, fooditem: Fooditem, chatRoominfo: ChatRoomInfo) {

        newMessage.msgCreatedAt = this.serverTimestampFromFirestore;
        this.chatRoomRef.doc(`${chatRoominfo.roomID}`).set(chatRoominfo);
        this.chatRoomRef.doc(`${chatRoominfo.roomID}`).collection('conversation').add(newMessage)
        .then(
          result => {
            console.log('first time login, created new room', result);
          },
          err => console.error(err, 'You do not have access!')
          );
  }


  getRoomMessages(chatRoominfo: ChatRoomInfo): Observable<ChatMessage[]> {
    this.chatRoomRef.valueChanges().subscribe(docs => {
      console.log('seller document', docs);
    });
    // tslint:disable-next-line:max-line-length
    return this.chatRoomRef.doc(`${chatRoominfo.roomID}`).collection<ChatMessage>('conversation', ref => ref.orderBy('msgCreatedAt')).valueChanges();
  }


  getSellerMessages(fooditem: Fooditem): Observable<ChatMessage[]> {
    const sellerId = fooditem.createdBy;
    const fooditemId = fooditem.id;
    console.log('seller room data', fooditem);

   this.afs.collection<ChatRoomInfo>('chat-data', ref => ref.where('fooditemID', '==', fooditemId))
   .valueChanges()
   .subscribe( docData => {
      console.log('ChatRoom Info', docData);
      return docData;
   });





    // this.chatRoomRef.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as ChatMessage;
    //     const chatRoomName = a.payload.doc.id;
    //     console.log('seller document data', chatRoomName);
    //     // tslint:disable-next-line:max-line-length
    //     console.log('chat-observable', this.chatRoomRef.doc(`${chatRoomName}`)
    // .collection<ChatMessage>('conversation', ref => ref.orderBy('msgCreatedAt')).valueChanges());

    //     return { chatRoomName, data };
    //   }))
    // ).subscribe();

    return this.chatRoomRef.valueChanges();
   // return this.chatRoomRef.doc('fooditemId').collection<ChatMessage>(`${sellerId}`, ref => ref.orderBy('msgCreatedAt')).valueChanges();

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
    console.log('User dataservice: ', user);
    const promise = this.appUserRef.doc(user.uid).set(user);
    await promise.then(res => {
      console.log('saveUserDataToFirebase(user): ', user);
      console.log('New User Saved!!');
    }, err => {
      console.log('Error during create User: ', err);
    });
  }

   async updateUserData(uid: string, data: any) {
    // Sets user data to firestore on login
     const promise = this.appUserRef.doc(uid).update(data);
     await promise.then(
       res => {
         console.log('User data updated!!');
       }, err => {
         console.log('Error during update User: ', err);
       }
     );
  }


  deleteUser(uid: string) {
    // TODO: Delete user from firebase database.
    console.log('User deleted: ', uid);
  }

  // </AppUser...>

}
