import { Injectable } from '@angular/core';
import { Fooditem } from './models';
import { DataService } from './data.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ChatResolver implements Resolve<Fooditem> {

    constructor(private dataService: DataService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Fooditem> {
        const id = route.paramMap.get('fid');
        return this.dataService.getProductByID(id).pipe(
            take(1)
        );
    }

}
