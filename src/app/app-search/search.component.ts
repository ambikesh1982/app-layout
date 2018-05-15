import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
<<<<<<< HEAD
import { DataService } from '../core/data.service';
=======
>>>>>>> accd71c67991292d46981e4dcb2d68e9a0902a65
import { Fooditem, ILocation } from '../core/models';
import { LocationService } from '../core/location.service';
import { ScriptLoadService } from '../core/script-load.service';

import { } from 'googlemaps';
import { environment } from '../../environments/environment';
import { FirestoreService } from '../core/firestore.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { map, distinct, tap, flatMap, take } from 'rxjs/operators';
import { DataService } from '../core/data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  geoLocations$: Observable<ILocation[]>;
  public cuisines: string[];

  locationFromNavigator: { lat: number, lng: number };

<<<<<<< HEAD
  // Reference to div, to show map
  @ViewChild('mapElement') mapElm: ElementRef;
  geoLocations$: Observable<ILocation[]>;

  constructor( private productService: DataService,
    private firestore: FirestoreService,
    private googleMapScript: ScriptLoadService) {
=======
  constructor(
    private dataService: DataService) {
>>>>>>> accd71c67991292d46981e4dcb2d68e9a0902a65
      this.cuisines = ['All Cuisines'];
      // Setting up default location
      this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
   }

  ngOnInit() {
    // Get distinct cuisines
<<<<<<< HEAD
    this.productService.getProductList().pipe(
=======
    this.dataService.getProductList().pipe(
>>>>>>> accd71c67991292d46981e4dcb2d68e9a0902a65
      flatMap( (fooditems: Fooditem[]) => fooditems),
      map( fooditem => fooditem.cuisine),
      distinct(),
      // tap( fi => console.log(fi))
    ).subscribe(fi => {
      this.cuisines.push(fi);
    });

    // this.geoLocations$ = this.firestore.getProducts$(2);
  }

}
