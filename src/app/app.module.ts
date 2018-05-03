// Application modules
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
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
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { environment } from '../environments/environment';
import { GoogleMapService } from './core/google-map.service';
import { ScriptLoadService } from './core/script-load.service';
import { DataService } from './core/data.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirestoreService } from './core/firestore.service';


// import { MediaMatcher } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: environment.googleMapsApiKey,
    //   libraries: ['places', 'geometry'] }),
    // AgmCoreModule.forRoot({ apiKey: environment.googleMapsApiKey }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
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
  providers: [LayoutService, GoogleMapService, FirestoreService, ProductService, CanDeactivateGuard, ScriptLoadService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
