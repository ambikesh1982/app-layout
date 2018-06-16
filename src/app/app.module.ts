// Application modules
import { AppRoutingModule } from './app-routing.module';
// import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

// Environment
import { environment } from '../environments/environment';

// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Google Maps
import { ScriptLoadService } from './core/script-load.service';

// Application components
import { AppCartModule } from './app-cart/app-cart.module';
import { AppComponent } from './app.component';
import { AppSearchModule } from './app-search/app-search.module';
import { ProductModule } from './product/product.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SharedModule } from './shared/shared.module';

// Application Services
import { CanDeactivateGuard } from './core/can-deactivate-guard';
import { DataService } from './core/data.service';
import { FirestoreService } from './core/firestore.service';
import { LayoutService } from './core/layout.service';
import { ProductListResolver } from './core/product-list.resolver';
import { ProductResolver } from './core/product.resolver';
import { LocationService } from './core/location.service';
import { TestnavComponent } from './testnav/testnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { AppShellComponent } from './app-shell.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ChatResolver } from './core/chat.resolver';
import { ChatService } from './chat/chat.service';
import { AppUserService } from './app-user/app-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppCartService } from './app-cart/app-cart.service';


@NgModule({
  declarations: [
    AppComponent,
    TestnavComponent,
    HomeComponent,
    AppShellComponent,
    PageNotFoundComponent,
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: environment.googleMapsApiKey,
    //   libraries: ['places', 'geometry'] }),
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyD2f1CqoyF3XhEuIPBXidqfXWTKPFyueIY' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    CanDeactivateGuard,
    AuthGuard,
    DataService,
    FirestoreService,
    LocationService,
    LayoutService,
    ProductListResolver,
    ProductResolver,
    ScriptLoadService,
    AuthService,
    ChatResolver,
    ChatService,
    AppUserService,
    AppCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
