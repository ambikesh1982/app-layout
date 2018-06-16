import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCartComponent } from './app-cart.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppCartService } from './app-cart.service';
import { AuthGuard } from '../core/auth.guard';

const appCartRoutes: Routes = [
  {
    path: '',
    component: AppCartComponent,
    canActivate: [AuthGuard],
    data: {title: 'APP_CART_PAGE'} },
  ];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(appCartRoutes),
  ],
  declarations: [AppCartComponent],
  providers: []
})
export class AppCartModule { }
