import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';
import { LocationService } from '../../../core/location.service';
import { FormGroup } from '@angular/forms';
import { IGeoInfo } from '../../../core/models';
import { take, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})

export class PlaceAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription;

  @ViewChild('addessSearch') searchElm: ElementRef;
  @ViewChild('gmap') mapElm: ElementRef;
  @Input() productForm: FormGroup;
  @Input() userGeoInfo: IGeoInfo;

  geoInfo: IGeoInfo;

  place: google.maps.places.PlaceResult;

  constructor(private locationService: LocationService, private ngZone: NgZone) {
    console.log('constructor: #### View Initialized ####');
    this.locationService.loadGoogleMapScript(); // Initialize googe-maps
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('afterViewInit: #### View Initialized ####');

    this.locationService.isGoogle$.pipe(
      tap(() => {
        if (this.userGeoInfo) {
          console.log('this.userGeoInfo = true >>>>', this.userGeoInfo);

          // this.patchGeoInfoFromAppUser(this.userGeoInfo);

          this.geoInfo = this.userGeoInfo;

          this.locationService.createMap(
            this.mapElm,
            this.userGeoInfo.coordinates.latitude,
            this.userGeoInfo.coordinates.longitude
          );

        } else {

          const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement /*, {types: ['geocode']}*/);

          autoComplete.addListener('place_changed', () => {
            this.ngZone.run(() => {

              const place = autoComplete.getPlace();

              if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                const geoPoint = new firebase.firestore.GeoPoint(lat, lng);

                const map = this.locationService.createMap(this.mapElm, lat, lng);

                this.geoInfo = {
                  coordinates: geoPoint,
                  autoAddressFromMap: place.formatted_address,
                  addressFromUser: null
                };

              } else {
                console.log('Unable to find a place! try again!!');
                return;
              }
            }); // ngZone.run
          }); // autoComplete.addListener
        } // else
      }) // tap
    ).subscribe();
  }

  // patchGeoInfoFromAppUser(geo: IGeoInfo) {
  //   this.productForm.patchValue(
  //     {
  //       autoAddressFromMap: geo.autoAddressFromMap,
  //       addressFromUser: geo.addressFromUser
  //     });
  // }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
