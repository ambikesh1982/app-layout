import { Injectable } from '@angular/core';
import { Fooditem } from './models';
import { DataService } from './data.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ProductResolver implements Resolve<Fooditem> {

    constructor(
        private dataService: DataService,
        private router: Router,
        private auth: AuthService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Fooditem> {
        const id = route.paramMap.get('id');
        return this.dataService.getProductByID(id).pipe(
            delay(2000), // added a delay to test loading spinner. To be removed later.
            take(1)
        );

           }
    }
