import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../shared/shared.module';

const appSearchRoutes: Routes = [
  { path: 'search', component: SearchComponent, data: {title: 'APP_SEARCH_PAGE'} }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(appSearchRoutes),
    SharedModule
  ],
  declarations: [SearchComponent]
})
export class AppSearchModule { }
