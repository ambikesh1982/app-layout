import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductModifyComponent } from './product-modify/product-modify.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes,  } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../../environments/environment';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard';
import { DialogService } from '../shared/dialog.service';


const productRoutes: Routes = [
  { path: '', redirectTo: '/product/list', pathMatch: 'full'},
  { path: 'product/list', component: ProductListComponent, data: { title: 'list' } },
  { path: 'product/detail/:id', component: ProductDetailComponent, data: { title: 'detail' } },
  { path: 'product/addnew', component: ProductNewComponent, data: { title: 'New Fooditem' }, canDeactivate: [CanDeactivateGuard] },
  { path: 'product/modify/:id', component: ProductModifyComponent, data: { title: 'modify' } },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(productRoutes),
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [DialogService],
  declarations: [ProductListComponent, ProductDetailComponent, ProductNewComponent, ProductModifyComponent]
})
export class ProductModule { }
