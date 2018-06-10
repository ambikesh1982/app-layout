import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Input, OnDestroy, OnChanges } from '@angular/core';
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

export class PlaceAutocompleteComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

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

  ngOnChanges() {
    console.log('#### from ngOnChanges() ####');
    if (this.userGeoInfo ) {
      this.patchUserAddress(this.userGeoInfo);
    }
  }

  ngOnInit() {
  }


  patchUserAddress(geoInfo: IGeoInfo) {
    this.productForm.get('addressForm').patchValue(
      {
        autoAddressFromMap: geoInfo.autoAddressFromMap,
        addressFromUser: geoInfo.addressFromUser,
        coordinates: geoInfo.coordinates
      });
    this.productForm.get('addressForm').disable();
  }

  ngAfterViewInit() {
    console.log('afterViewInit: #### View Initialized ####');

    this.locationService.isGoogle$.pipe(
      tap(() => {
        if (this.productForm.get('addressForm.coordinates').value) {
          console.log('this.userGeoInfo = true >>>>', this.userGeoInfo);
          this.locationService.createMap(
            this.mapElm,
            this.productForm.get('addressForm.coordinates').value.latitude,
            this.productForm.get('addressForm.coordinates').value.longitude
          );

        }
        // else {

          const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement /*, {types: ['geocode']}*/);

          autoComplete.addListener('place_changed', () => {
            this.ngZone.run(() => {

              const place = autoComplete.getPlace();

              if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                const geoPoint = new firebase.firestore.GeoPoint(lat, lng);

                this.productForm.get('addressForm.coordinates').patchValue(geoPoint);
                this.productForm.get('addressForm.autoAddressFromMap').patchValue(place.formatted_address);


                const map = this.locationService.createMap(this.mapElm, lat, lng);

              } else {
                console.log('Unable to find a place! try again!!');
                return;
              }
            }); // ngZone.run
          }); // autoComplete.addListener
        // } // else
      }) // tap
    ).subscribe();
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
