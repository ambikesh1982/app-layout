import { Component, OnInit } from '@angular/core';
import { LayoutService, FabAction } from '../core/layout.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  categories = [
    'All Categories',
    'North Indian',
    'South Indian',
    'Indo-Chinese',
    'Mughlai',
    'Maharashtrian',
    'Bengali'];

  constructor( private layoutService: LayoutService) {
    this.layoutService.appToolBar$.next(null);

    const fabAction: FabAction = {
      showFabAction: true,
      fabAction: 'FAB_ACTION_SEARCH'
    };

    this.layoutService.fabAction$.next(fabAction);
   }

  ngOnInit() {
  }

}
