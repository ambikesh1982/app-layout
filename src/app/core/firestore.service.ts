import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Fooditem, IGeoInfo } from './models';

@Injectable()
export class FirestoreService {
  // products$: Observable<Fooditem[]>;
  products$: Observable<IGeoInfo[]>;
  geoLoc: IGeoInfo;
  geoPointType: firebase.firestore.GeoPoint;

  constructor(private _afs: AngularFirestore) {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    firestore.settings(settings);
  }

  public getProducts$(range: number): Observable<IGeoInfo[]> {
    this.products$ = this._afs.collection<IGeoInfo>('geoLocationsTest').valueChanges();
    return this.products$;
  }



  saveGeoCodes(lat: number, lng: number) {
    // // *** Usage
    // const geopoint = this.db.geopoint(38, -119)
    // return this.db.add('items', { location: geopoint })

    // *** Code
    // geopoint(lat: number, lng: number) {
      // return new firebase.firestore.GeoPoint(lat, lng)
    // }

    const geopoint = new firebase.firestore.GeoPoint(lat, lng);
    this.geoLoc.coordinates = geopoint;
    const geoCollection = this._afs.collection('geoLocationsTest');
    geoCollection.add(this.geoLoc);
  }

}
