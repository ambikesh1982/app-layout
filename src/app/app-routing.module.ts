import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell.component';
import { enableLogging } from '@firebase/database-types';
import { PageNotFoundComponent } from './page-not-found.component';
// import { ProductListComponent } from './product/product-list/product-list.component';
// import { ProductModule } from './product/product.module';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AppShellComponent,
    children: [
      { path: 'product', loadChildren: './product/product.module#ProductModule' },
      { path: 'app-cart', loadChildren: './app-cart/app-cart.module#AppCartModule' },
    ]
  },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
