import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FabActionComponent } from './fab-action.component';
import { FooterComponent } from './footer.component';
import { ListCardComponent } from './list-card.component';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
  FabActionComponent,
  FooterComponent,
  ListCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [AppToolbarComponent, FabActionComponent, FooterComponent, ListCardComponent],
  exports: [
    SHARED_COMPONENTS
  ]
})
export class SharedModule { }
