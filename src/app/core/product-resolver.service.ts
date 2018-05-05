import { Injectable } from '@angular/core';
import { Fooditem } from './models';
import { DataService } from './data.service';
import { Resolve } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';

@Injectable()
export class ProductResolverService implements Resolve<Fooditem[]> {

  constructor( private dataService: DataService) { }

  resolve(): Observable<Fooditem[]> {
    return this.dataService.getProductList().pipe(
      delay(5000),
      take(1)
    );
  }

}
