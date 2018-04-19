// Application modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';


// Application components
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { LayoutService } from './core/layout.service';
import { ProductService } from './core/product.service';
import { AppCartModule } from './app-cart/app-cart.module';
import { SignInModule } from './sign-in/sign-in.module';
import { AppSearchModule } from './app-search/app-search.module';
// import { MediaMatcher } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppCartModule,
    AppSearchModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ProductModule,
    SharedModule,
    SignInModule
  ],
  providers: [LayoutService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
