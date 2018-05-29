import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usersCollection: any;

  firebaseModules = ['Cloud FireStore', 'Realtime Database', 'Storage', 'Athentication'];

  constructor( private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('appUsers').valueChanges();
   }

  ngOnInit() {
  }

}
