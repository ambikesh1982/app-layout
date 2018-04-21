import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductNewComponent } from '../product/product-new/product-new.component';

@Injectable()
export class NavigateAwayGuard implements CanDeactivate<ProductNewComponent> {
  canDeactivate(component: ProductNewComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('FoodListComponent-Guard');
    console.log(route.params);
    console.log('URL', state.url);
    return component.canDeactivate() ? component.canDeactivate() : true;
  }
}
