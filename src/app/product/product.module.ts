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
import { ProductManageComponent } from './product-manage/product-manage.component';
  import { ImageUploadComponent } from './product-manage/image-upload/image-upload.component';
  import { ProductForm1Component } from './product-manage/product-form/product-form1/product-form1.component';
  import { ProductForm2Component } from './product-manage/product-form/product-form2/product-form2.component';
  import { PlaceAutocompleteComponent } from './product-manage/place-autocomplete/place-autocomplete.component';
import { AuthGuard } from '../core/auth.guard';




// Product module router paths go here...
const productRoutes: Routes = [
  // { path: '', redirectTo: '/product/list', pathMatch: 'full' },
  // {
  //   path: 'add-new',
  //   component: ProductNewComponent,
  //   data: { title: 'PRODUCT_NEW_PAGE' },
  //   canDeactivate: [CanDeactivateGuard],
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'manage/:id',
    component: ProductManageComponent,
    data: { title: 'PRODUCT_MANAGE_PAGE' },
    resolve: { product: ProductResolver },
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
    data: { title: 'PRODUCT_DETAIL_PAGE' },
    resolve: { product: ProductResolver }
  },
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'PRODUCT_LIST_PAGE' },
    // resolve: { products: ProductListResolver}
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
    ProductManageComponent,
      ImageUploadComponent,
      ProductForm1Component,
      ProductForm2Component,
      PlaceAutocompleteComponent,
  ]
})
export class ProductModule { }
