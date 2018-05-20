import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProductListComponent } from './product/product-list/product-list.component';
// import { ProductModule } from './product/product.module';

const routes: Routes = [
  // { path: 'product', loadChildren: 'app/product/product.module#ProductModule'},
  // { path: 'app-cart', loadChildren: 'app/app-cart/app-cart.module#AppCartModule' },
  // { path: '', redirectTo: '', pathMatch: 'full'},
  // { path: 'list', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
