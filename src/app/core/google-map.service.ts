import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Observer } from 'rxjs';

@Injectable()
export class GoogleMapService {

  constructor() {}

  // retruns user position detected by browser navigator
  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
           // error.code can be:
           //   0: unknown error
           //   1: permission denied
           //   2: position unavailable (error response from location provider)
           //   3: timed out
          console.log('Geolocation service: ' + error.message);
          observer.error(error);
        },
        { enableHighAccuracy: true, maximumAge: 600000, timeout: 15000 }
      );
    });
  }


}
