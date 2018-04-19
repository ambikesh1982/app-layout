import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Fooditem } from './models';
import { FOODITEMS } from './mock-data';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(): Observable<Fooditem[]> {
    return of(FOODITEMS);
  }

  getProductsByUser(): Observable<Fooditem[]> {
    // TODO: Fetch the list of user uploads
    return of(FOODITEMS);
  }

  getProductsByCart(): Observable<Fooditem[]> {
    // TODO: Get the product ids form user cart and return the list of products.
    return of(FOODITEMS);
  }

  getProductByID(index: number): Observable<Fooditem> {
    return of(FOODITEMS[index]);
  }



}
