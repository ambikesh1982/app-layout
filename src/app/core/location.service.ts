import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Observable, Observer, of, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ScriptLoadService } from './script-load.service';
import { IGeoInfo } from './models';
import * as firebase from 'firebase/app';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class LocationService {

  myCurrentPosition: Observable<Position>;
  geoFromAutoComplete$ = new BehaviorSubject<IGeoInfo>({});

  isGoogle$ = new Subject<boolean>();

  constructor(private load: ScriptLoadService, private ngZone: NgZone) {
    this.myCurrentPosition = this.getCurrentPosition();
  }

  // retruns user position detected by browser navigator
  private getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            observer.next(position);
            observer.complete();
          },
          (error: PositionError) => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          { enableHighAccuracy: true, maximumAge: 600000, timeout: 500000 }
        );
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }

  async loadGoogleMapScript() {
    await this.load.loadScript(environment.googleMapURL, 'google-map', () => {
      console.log('Google-Maps Initiated!!');
      this.isGoogle$.next(true);
    });
  }

  // Create a map with the marker.
  createMap(mapElement: ElementRef, myLat: any, myLng: any): google.maps.Map {

    const myLatLng = { lat: myLat, lng: myLng };
    const map = new google.maps.Map(mapElement.nativeElement, {
      zoom: 18,
      center: myLatLng,
      disableDefaultUI: true,
      scrollwheel: false,
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });

    return map;
  }

  placeAutoComplete(searchElement: ElementRef) {
    const autoComplete = new google.maps.places.Autocomplete(searchElement.nativeElement /*, {types: ['geocode']}*/);
    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autoComplete.getPlace();
        console.log('place ####: ', place);

        if (place.geometry) {
          const geoPoint = new firebase.firestore.GeoPoint(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );

          const geo: IGeoInfo = {
            coordinates: geoPoint,
            autoAddressFromMap: place.formatted_address,
            addressFromUser: null
          };
          //   this.geoFromAutoComplete$.next({
          //     coordinates: geoPoint,
          //     autoAddressFromMap: place.formatted_address,
          //     addressFromUser: null
          //   });
          // } else {
          //   console.log('Unable to find a place!');
          //   this.geoFromAutoComplete$.next({});
          // }

        }
      });

    });
  }
}
