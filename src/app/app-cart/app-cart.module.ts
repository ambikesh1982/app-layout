import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCartComponent } from './app-cart.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const appCartRoutes: Routes = [
  { path: 'cart', component: AppCartComponent },
  ];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(appCartRoutes),
  ],
  declarations: [AppCartComponent]
})
export class AppCartModule { }
