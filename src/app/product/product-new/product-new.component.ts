import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';
import { Fooditem } from '../../core/models';
import { DataService } from '../../core/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {


  @ViewChild('upload') upload;
  @ViewChild('form') form;
  @ViewChild('autoComplete') autoComplete;

  newFooditem: Fooditem;

  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
  ) {
    this.newFooditem = {}; // Create empty fooditem.
    this.newFooditem.images = [];
    this.newFooditem.paymentOptions = {};
    this.newFooditem.deliveryOptions = {};
    // this.newFooditem.coordinates = {0,0};
    this.newFooditem.id = dataService.getFirebaseDocumentKey();
    // this.newFooditem.id = 'dummyIdToAvoidFirebaseCalls';
    }

  prepareDataFromStepper(stepperEvent: any) {
    console.log('stepperEvent: ', stepperEvent);
    if (stepperEvent.previouslySelectedIndex < stepperEvent.selectedIndex) {

      switch (stepperEvent.previouslySelectedIndex) {
        case 0: {
          // This executes when you move to step number 2.
          this.newFooditem.images = this.upload.imageURLs;
          console.log('Completed Step 0: Added image array', this.newFooditem);
          break;
        }
        case 1: {
          this.newFooditem.title = this.form.productForm.value.title;
          this.newFooditem.description = this.form.productForm.value.description;
          this.newFooditem.isNonVeg = this.form.productForm.value.isNonVeg;
          this.newFooditem.price = this.form.productForm.value.price;
          this.newFooditem.serving = this.form.productForm.value.serving;
          this.newFooditem.category = this.form.productForm.value.category;
          this.newFooditem.cuisine = this.form.productForm.value.cuisine;
          this.newFooditem.paymentOptions.cashOnDelivery = this.form.productForm.value.cashOnDelivery;
          this.newFooditem.paymentOptions.onlinePayment = this.form.productForm.value.onlinePayment;
          this.newFooditem.deliveryOptions.takeAway = this.form.productForm.value.takeAway;
          this.newFooditem.deliveryOptions.homeDelivery = this.form.productForm.value.homeDelivery;
          this.newFooditem.deliveryOptions.dineIn = this.form.productForm.value.dineIn;

          // This executes when you move to step number 3.
          console.log('Completed Step 1: Added form data ', this.newFooditem);

          break;
        }
        case 2: {
          const point = this.autoComplete.place.geometry.location;
          this.newFooditem.coordinates = new firebase.firestore.GeoPoint(point.lat(), point.lng());
          this.newFooditem.address = this.autoComplete.place.formatted_address;
          // this.dataService.createProduct(this.newFooditem);
          console.log('Completed Step 2: Added location data ', this.newFooditem);
          // this.product.createProduct(this.newFooditem);
          break;
        }
      }
    } else { console.log('User moved back to previous step'); }
  }



  canDeactivate(): MatDialogRef<DialogComponent> {
    return this.dialogService.openDialog('Discard changes for this Product?');
  }

  getImageUrls(event: any) {
    console.log('Image Urls: ', event.data);
  }

  prepareProduct() {

  }

  ngOnInit() {
  }

}
