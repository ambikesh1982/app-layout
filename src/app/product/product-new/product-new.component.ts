import { Component, OnInit } from '@angular/core';
import { LayoutService, AppToolbar, FabAction } from '../../core/layout.service';
import { DialogService } from '../../shared/dialog.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {

  constructor( private layoutService: LayoutService,
               public dialogService: DialogService) {

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

  canDeactivate(): Observable<boolean> | boolean {
    console.log('New product canDeactivate Guard');
    // return window.confirm('Do you want to Discard Changes');
    return this.dialogService.confirm('Discard changes for this Product?');
  }

  ngOnInit() {
  }

}
