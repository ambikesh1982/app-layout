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
import { ProductListResolver } from '../core/product-list.resolver';
import { ProductResolver } from '../core/product.resolver';
import { ImageUploadComponent } from './product-new/image-upload/image-upload.component';


// Product module router paths go here...
const productRoutes: Routes = [
  { path: '', redirectTo: '/product/list', pathMatch: 'full'},
  { path: 'product/list',
    component: ProductListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
    resolve: { products: ProductListResolver} },
  { path: 'product/detail/:id',
    component: ProductDetailComponent,
    data: { title: 'PRODUCT_DETAIL_PAGE' },
    resolve: { product: ProductResolver }},
  { path: 'product/addnew',
    component: ProductNewComponent,
    data: { title: 'PRODUCT_NEW_PAGE' },
    canDeactivate: [CanDeactivateGuard] },
  { path: 'product/modify/:id',
    component: ProductModifyComponent,
    data: { title: 'PRODUCT_MODIFY_PAGE' },
    resolve: { product: ProductResolver } },
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
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductNewComponent,
    ProductModifyComponent,
    ImageUploadComponent
  ]
})
export class ProductModule { }
