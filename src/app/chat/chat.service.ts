import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import * as firebase from 'firebase/app';

// rxjs imports
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, filter, flatMap } from 'rxjs/operators';

// local imports
import { Fooditem, ChatMessage, AppUser, ChatRoomInfo } from '../core/models';


const APP_ROOT_COLLECTIONS = {
  'PRODUCTS': 'products',
  'USERS': 'appusers',
  'CHATS': 'appchats',
};

@Injectable()
export class ChatService {
  private appUserPath: string;
  private chatroomPath: string;
  private chatMessages: Observable<ChatMessage[]>;
  private chatRoomRef: AngularFirestoreCollection<ChatMessage>;
  FooditemID$: BehaviorSubject<string>;
  roomID$: BehaviorSubject<any>;

  ccc: any;

  currentChatPath: any;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.FooditemID$ = new BehaviorSubject(null);

    this.appUserPath = APP_ROOT_COLLECTIONS['USERS'];
    this.chatroomPath = APP_ROOT_COLLECTIONS['CHATS'];

    this.chatRoomRef = this.createFirestoreCollectionRef(APP_ROOT_COLLECTIONS['CHATS']);

  }

  createFirestoreCollectionRef(collectionPath: string): AngularFirestoreCollection<any> {
    return this.afs.collection<any>(collectionPath);
  }  // createFirestoreCollectionRef

  getFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

async createChatMessages(newMessage: ChatMessage, fooditem: Fooditem, chatRoominfo: ChatRoomInfo, isBuyer: boolean) {

  if (isBuyer) {
    newMessage.msgCreatedAt = this.serverTimestampFromFirestore;
    this.chatRoomRef.doc(`${chatRoominfo.roomID}`).set(chatRoominfo);
    this.chatRoomRef.doc(`${chatRoominfo.roomID}`).collection('conversation').add(newMessage)
      .then(
      result => {
        console.log('first time login, created new room', result);
      },
      err => console.error(err, 'You do not have access!')
      );
  } else {
    console.log('seller login', this.roomID$);
    newMessage.msgCreatedAt = this.serverTimestampFromFirestore;
    this.chatRoomRef.doc(`${this.roomID$}`).collection('conversation').add(newMessage);
}
}


getRoomID(fooditem: Fooditem): Observable<any> {
  const fooditemId = fooditem.id;
  return this.afs.collection<any>('appchats', ref => ref.where('fooditemID', '==', fooditemId)).valueChanges();
}

getSellerMessages(fooditem: Fooditem): Observable < any > {
 const sellerId = fooditem.createdBy;
 const fooditemId = fooditem.id;
  console.log('seller id from Chatservice', sellerId);

  return this.afs.collection<any>('appchats').valueChanges().pipe(
    flatMap(res => res),
    filter(item => item.fooditemID === fooditemId),
    switchMap(s => {
      console.log('seller filtered data', s);
      this.currentChatPath = `${s.roomID}`;
      console.log('this.currentChatPath: ', this.currentChatPath);
      this.roomID$ = this.currentChatPath;
      return this.chatRoomRef.doc(s.roomID).collection('conversation', ref => ref.orderBy('msgCreatedAt')).valueChanges();
    }
    )
  );



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

  // return this.chatRoomRef.valueChanges();
  // return this.chatRoomRef.doc('fooditemId').collection<ChatMessage>(`${sellerId}`, ref => ref.orderBy('msgCreatedAt')).valueChanges();

}

  getRoomMetaData(sellerID: string): Observable<any> {
    return this.afs.collection<any>('appchats').valueChanges();
  }

getRoomMessages(chatRoominfo: ChatRoomInfo): Observable < ChatMessage[] > {
  this.chatRoomRef.valueChanges().subscribe(docs => {
    console.log('seller document', docs);
  });
  // tslint:disable-next-line:max-line-length
  return this.chatRoomRef.doc(`${chatRoominfo.roomID}`).collection<ChatMessage>('conversation', ref => ref.orderBy('msgCreatedAt')).valueChanges();
}


removeRoom(chatroom: ChatMessage): Promise < any > {
  const roomPath = `${this.chatroomPath}/${chatroom.createdByUserId}`;
  return this.afs.doc<ChatMessage>(roomPath).delete();
}
}