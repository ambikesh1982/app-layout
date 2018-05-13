import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';
import { environment } from '../../../../environments/environment';
import { LocationService } from '../../../core/location.service';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})

export class PlaceAutocompleteComponent implements OnInit {

  @ViewChild('addessSearch') searchElm: ElementRef;
  place: google.maps.places.PlaceResult;
  address: string;

  constructor(
    private load: ScriptLoadService,
    private location: LocationService,
    private ngZone: NgZone) {
    this.location.getCurrentPosition().subscribe( loc => {
      console.log('LocationService: { lat: ', loc.coords.latitude, ', lng: ', loc.coords.longitude, ' }' );
    });
   }

  ngOnInit() {
    this.load.loadScript(environment.googleMapURL, 'google-map', () => {

      // Add Google Autocomplete to list near by addresses
      const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement);

      // Listen to inputs field and find the places
      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autoComplete.getPlace();

          if (this.place.geometry) {
            const loc = this.place.geometry.location;
            this.address = this.place.formatted_address;
          } else {
            console.log('Unable to find a place!');
          }

        });
      });
    });
  }
}
