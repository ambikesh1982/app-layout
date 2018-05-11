import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})

export class PlaceAutocompleteComponent implements OnInit {

  @ViewChild('addessSearch') searchElm: ElementRef;

  constructor(private load: ScriptLoadService, private ngZone: NgZone) { }

  ngOnInit() {
    this.load.loadScript(environment.googleMapURL, 'google-map', () => {

      // Add Google Autocomplete to list near by addresses
      const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement);

      // Listen to inputs field and find the places
      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autoComplete.getPlace();
          console.log('place autocomplete - Geolocation: ', place.geometry.location);
          console.log('place autocomplete - Formatted Add: ', place.formatted_address);
          console.log('place autocomplete - Adr Add: ', place.adr_address);

          if (!place.geometry) {
            console.log('Unable to find a place!');
            return;
          }

        });
      });
    });
  }
}
