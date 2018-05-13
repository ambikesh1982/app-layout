import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Fooditem, ILocation } from './models';

@Injectable()
export class FirestoreService {
  // products$: Observable<Fooditem[]>;
  products$: Observable<ILocation[]>;
  geoLoc: ILocation = {};
  geoPointType: firebase.firestore.GeoPoint;

  constructor(private _afs: AngularFirestore) {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    firestore.settings(settings);
  }

  public getProducts$(range: number): Observable<ILocation[]> {
    this.products$ = this._afs.collection<ILocation>('geoLocationsTest').valueChanges();
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
    this.geoLoc.userLocation = geopoint;
    const geoCollection = this._afs.collection('geoLocationsTest');
    geoCollection.add(this.geoLoc);
  }

}
