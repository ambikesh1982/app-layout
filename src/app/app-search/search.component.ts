import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../core/product.service';
import { Fooditem, ILocation } from '../core/models';
import { LocationService } from '../core/location.service';
import { ScriptLoadService } from '../core/script-load.service';

import { } from 'googlemaps';
import { environment } from '../../environments/environment';
import { FirestoreService } from '../core/firestore.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { map, distinct, tap, flatMap, take } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements AfterViewInit, OnInit {

  public cuisines: string[];

  mapType = 'terrain';

  myLoc: ILocation;

  private map: google.maps.Map;
  private marker: google.maps.Marker;
  private center: google.maps.LatLng;

  private locationFromNavigator: { lat: number, lng: number };

  // Reference to div, to show map
  @ViewChild('mapElement') mapElm: ElementRef;
  geoLocations$: Observable<ILocation[]>;

  constructor( private productService: ProductService,
    private firestore: FirestoreService,
    private googleMapScript: ScriptLoadService) {
      this.cuisines = ['All Cuisines'];
      // Setting up default location
      this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
   }

  ngOnInit() {
    // Get distinct cuisines
    this.productService.getProducts().pipe(
      flatMap( (fooditems: Fooditem[]) => fooditems),
      map( fooditem => fooditem.cuisine),
      distinct(),
      // tap( fi => console.log(fi))
    ).subscribe(fi => {
      this.cuisines.push(fi);
    });

    this.geoLocations$ = this.firestore.getProducts$(2);

    // saveGeoCodes(lat: number, lng: number) {


    // this.firestore.saveGeoCodes(1.3522174, 103.87970299999999);
  }

  ngAfterViewInit() {
  if (this.locationFromNavigator) {
    this.googleMapScript.loadScript(environment.googleMapURL, 'google-map', () => {
      this.center = new google.maps.LatLng(
        this.locationFromNavigator.lat,
        this.locationFromNavigator.lng);

      // Create map
      this.map = new google.maps.Map(this.mapElm.nativeElement, {
        zoom: 18,
        center: this.center,
        disableDefaultUI: true,
        scrollwheel: false,
      });

      // Add Marker to current location detected by browser
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map
      });
});
  }
}

}
