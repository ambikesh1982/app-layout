import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell.component';
import { enableLogging } from '@firebase/database-types';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '', component: AppShellComponent, data: { title: 'APP_SHELL_PAGE' },
    children: [
      { path: 'app-cart', loadChildren: './app-cart/app-cart.module#AppCartModule' },
      { path: 'product', loadChildren: './chat/chat.module#ChatModule' },
      { path: 'search', loadChildren: './app-search/app-search.module#AppSearchModule' },
      { path: 'user', loadChildren: './app-user/app-user.module#AppUserModule' },
      { path: '', loadChildren: './product/product.module#ProductModule' },

    ]
  },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'home', component: HomeComponent, data: { title: 'APP_HOME_PAGE' } },
  { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, data: { title: 'PAGE_NOT_FOUND_PAGE' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
