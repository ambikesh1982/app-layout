import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialog.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {

  constructor( public dialogService: DialogService) {
   }

  canDeactivate(): Observable<boolean> | boolean {
    console.log('New product canDeactivate Guard');
    // return window.confirm('Do you want to Discard Changes');
    return this.dialogService.confirm('Discard changes for this Product?');
  }

  ngOnInit() {
  }

}
