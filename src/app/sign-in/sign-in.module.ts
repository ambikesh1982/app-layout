import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const signInRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(signInRoutes),
  ],
  declarations: [SignInComponent],
  exports: [SignInComponent]
})
export class SignInModule { }
