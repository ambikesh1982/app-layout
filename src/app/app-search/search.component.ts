import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Fooditem } from '../core/models';
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

  public cuisines: string[];

  locationFromNavigator: { lat: number, lng: number };

  constructor(
    private dataService: DataService) {
      this.cuisines = ['All Cuisines'];
      // Setting up default location
      this.locationFromNavigator = { lat: 1.3522174, lng: 103.87970299999999 };
   }

  ngOnInit() {
    // Get distinct cuisines
    this.dataService.getProductList().pipe(
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
