import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';

const appSearchRoutes: Routes = [
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(appSearchRoutes),
  ],
  declarations: [SearchComponent]
})
export class AppSearchModule { }
