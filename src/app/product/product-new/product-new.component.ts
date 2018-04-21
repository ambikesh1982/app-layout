import { Component, OnInit } from '@angular/core';
import { LayoutService, AppToolbar, FabAction } from '../../core/layout.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {

  constructor( private layoutService: LayoutService) {

    const toolbar: AppToolbar = {
      showPageTitle: true,
      pageTitle: 'Add new fooditem!',
      showCancelIcon: true,
    };

    const fabAction: FabAction = {
      showFabAction: true,
      fabAction: 'FAB_ACTION_NEXT'
    };

    this.layoutService.appToolBar$.next(toolbar);
    this.layoutService.fabAction$.next(fabAction);
   }

  canDeactivate() {
    console.log('canDeactivate Guard');
    return window.confirm('Do you want to Discard Changes');
  }

  ngOnInit() {
  }

}
