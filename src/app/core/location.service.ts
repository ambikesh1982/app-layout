import { Injectable, ElementRef, NgZone } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Observer, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ScriptLoadService } from './script-load.service';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class LocationService {

  myCurrentPosition: Observable<Position>;

  addressFromAutoComplete$ = new BehaviorSubject<any>('');

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

  loadGoogleMapScript() {
    this.load.loadScript(environment.googleMapURL, 'google-map', () => {
      console.log('Google-Maps Initiated!!');
    });
  }

  createMap(mapElement: ElementRef, myLat: any, myLng: any): google.maps.Map {
    const map = new google.maps.Map(mapElement.nativeElement, {
      zoom: 18,
      center: {
        // lat: geo.coords.latitude,
        // lng: geo.coords.longitude
        lat: myLat,
        lng: myLng
      },
      disableDefaultUI: true,
      scrollwheel: false,
    });
    return map;
  }

  placeAutoComplete(autoComplete) {
    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autoComplete.getPlace();

        if (place.geometry) {
          const loc = place.geometry.location;
          const address = place.formatted_address;
          this.addressFromAutoComplete$.next({address, loc});
          // console.log(address);
          // return of({ address, loc });
          // this.addressForm.setValue({ gmapAddress: this.address, userAddress: 'address from autocmp' });
        } else {
          console.log('Unable to find a place!');
          this.addressFromAutoComplete$.next('NO_PLACE');
          // return ('no place');
        }

      });
    });

  }
}
