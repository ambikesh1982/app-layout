import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell.component';
import { enableLogging } from '@firebase/database-types';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: AppShellComponent,
    children: [
      { path: 'product', loadChildren: './product/product.module#ProductModule' },
      { path: 'app-cart', loadChildren: './app-cart/app-cart.module#AppCartModule' },
      { path: 'product', loadChildren: './chat/chat.module#ChatModule' }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
