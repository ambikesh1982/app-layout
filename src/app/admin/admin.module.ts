import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
