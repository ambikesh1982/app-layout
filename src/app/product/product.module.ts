import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { CanDeactivateGuard } from '../core/can-deactivate-guard';
import { DialogService } from '../core/dialog.service';
import { ProductResolver } from '../core/product.resolver';



import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductNewComponent } from './product-new/product-new.component';
  import { ImageUploadComponent } from './product-new/image-upload/image-upload.component';
  import { ProductForm1Component } from './product-new/product-form/product-form1/product-form1.component';
  import { ProductForm2Component } from './product-new/product-form/product-form2/product-form2.component';
  import { PlaceAutocompleteComponent } from './product-new/place-autocomplete/place-autocomplete.component';
import { ProductModifyComponent } from './product-modify/product-modify.component';
import { ChatComponent } from '../chat/chat/chat.component';



// Product module router paths go here...
const productRoutes: Routes = [
  { path: '', redirectTo: '/product/list', pathMatch: 'full' },
  {
    path: 'product/list',
    component: ProductListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
    // resolve: { products: ProductListResolver}
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailComponent,
    data: { title: 'PRODUCT_DETAIL_PAGE' },
    canDeactivate: [CanDeactivateGuard],
    resolve: { product: ProductResolver }
  },
  {
    path: 'product/addnew',
    component: ProductNewComponent,
    data: { title: 'PRODUCT_NEW_PAGE' },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'product/modify/:id',
    component: ProductModifyComponent,
    data: { title: 'PRODUCT_MODIFY_PAGE' },
    resolve: { product: ProductResolver }
  },
  {
    path: 'product/chat',
    component: ChatComponent,
    data: { title: 'CHAT_PAGE' },
    resolve: { product: ProductResolver }
  },
];


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(productRoutes),
  ],
  providers: [DialogService],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductNewComponent,
      ImageUploadComponent,
      ProductForm1Component,
      ProductForm2Component,
      PlaceAutocompleteComponent,
    ProductModifyComponent,
  ]
})
export class ProductModule { }
