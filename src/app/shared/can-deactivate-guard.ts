import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ProductNewComponent } from '../product/product-new/product-new.component';

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('FoodListComponent-Guard');
    console.log(route.params);
    console.log('URL', state.url);
    // below commented code treggers canDeactivate() method twice.
    // return component.canDeactivate() ? component.canDeactivate() : true;
    return component.canDeactivate();
  }
}
