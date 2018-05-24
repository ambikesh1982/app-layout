import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Input } from '@angular/core';
import { ScriptLoadService } from '../../../core/script-load.service';
import { environment } from '../../../../environments/environment';
import { LocationService } from '../../../core/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})

export class PlaceAutocompleteComponent implements OnInit, AfterViewInit {

  @ViewChild('addessSearch') searchElm: ElementRef;
  @ViewChild('gmap') mapElm: ElementRef;
  place: google.maps.places.PlaceResult;
  address: string;

  @Input() productForm: FormGroup;
  mygeoLocation;
  radius;
  circle;

  addressFromGooleMap: {address: string, location: any};

  constructor(
    private locationService: LocationService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log('View Initialized !!!');
    this.locationService.loadGoogleMapScript();
    this.locationService.myCurrentPosition.subscribe(
      myLoc => {
        const map = this.locationService.createMap(this.mapElm, myLoc.coords.latitude, myLoc.coords.longitude);

        const autoComplete = new google.maps.places.Autocomplete(this.searchElm.nativeElement /*, {types: ['geocode']}*/);

        this.locationService.placeAutoComplete(autoComplete);

        this.locationService.addressFromAutoComplete$.subscribe(res => {
          if (res) {
          console.log('addressFromAutoComplete$: ', res);
          map.setCenter(res.loc);
          this.addressFromGooleMap = {address: res.address, location: res.loc};
          }
        });
      },
      e => console.log('Error from myCurrentPosition: ', e)
    );
  }
}
