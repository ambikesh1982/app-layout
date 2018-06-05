import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FabActionComponent } from './fab-action.component';
import { FooterComponent } from './footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DialogComponent } from './dialog/dialog.component';
import { ShowGmapComponent } from './show-gmap/show-gmap.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
  FabActionComponent,
  FooterComponent,
  ProductCardComponent,
  ShowGmapComponent,
  ImageCarouselComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    AppToolbarComponent,
    FabActionComponent,
    FooterComponent,
    ProductCardComponent,
    DialogComponent,
    ShowGmapComponent,
    ImageCarouselComponent
  ],
  exports: [
    SHARED_COMPONENTS
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
