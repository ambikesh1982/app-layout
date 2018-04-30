import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService, FabAction, AppToolbar } from '../core/layout.service';
import { ProductService } from '../core/product.service';
import { map, distinct, tap, flatMap, take } from 'rxjs/operators';
import { Fooditem } from '../core/models';
import { GoogleMapService } from '../core/google-map.service';
import { ScriptLoadService } from '../core/script-load.service';

import { } from 'googlemaps';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements AfterViewInit, OnInit {

  public cuisines: string[];

  mapType = 'terrain';

  private map: google.maps.Map;
  private marker: google.maps.Marker;
  private center: google.maps.LatLng;

  private locationFromNavigator: { lat: number, lng: number };

  // Reference to div, to show map
  @ViewChild('mapElement') mapElm: ElementRef;

  constructor( private productService: ProductService,
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
      tap( fi => console.log(fi))
    ).subscribe(fi => {
      this.cuisines.push(fi);
    });
  }

  ngAfterViewInit() {
  if (this.locationFromNavigator) {
    this.googleMapScript.loadScript(environment.googleMapURL, 'gmap', () => {
      this.center = new google.maps.LatLng(
        this.locationFromNavigator.lat,
        this.locationFromNavigator.lng);

      // Create map
      this.map = new google.maps.Map(this.mapElm.nativeElement, {
        zoom: 18,
        center: this.center,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
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
