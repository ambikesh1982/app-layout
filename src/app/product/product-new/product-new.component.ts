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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {


  @ViewChild('upload') upload;
  @ViewChild('form') form;
  @ViewChild('autoComplete') autoComplete;

  daysOfWeek = ['All days', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

  productForm2: FormGroup;

  fab_icon = 'arrow_forward';

  newFooditem: Fooditem;

  canNavigateAway: boolean;

  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.canNavigateAway = false;
    this.newFooditem = {}; // Create empty fooditem.
    this.newFooditem.images = [];
    this.newFooditem.paymentOptions = {};
    this.newFooditem.deliveryOptions = {};
    // this.newFooditem.coordinates = {0,0};
    this.newFooditem.id = dataService.getFirebaseDocumentKey();
    // this.newFooditem.id = 'dummyIdToAvoidFirebaseCalls';
    this.createForm();
    }

  createForm() {
    // User input values
    this.productForm2 = this.formBuilder.group({
      orderType: 'instant',
      // cashOnDelivery: true,
      // onlinePayment: false,
      takeAway: true,
      homeDelivery: false,
      dineIn: false,
    });
  }

  prepareDataFromStepper(stepperEvent: any) {
    console.log('stepperEvent: ', stepperEvent);
    if (stepperEvent.previouslySelectedIndex < stepperEvent.selectedIndex) {

      switch (stepperEvent.previouslySelectedIndex) {
        case 0: {
          // This executes when you move to step number 2.
          this.newFooditem.images = this.upload.images;
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
          // This executes when you move to step number 3.
          console.log('Completed Step 1: Added form data ', this.newFooditem);

          break;
        }
        case 2: {
          this.newFooditem.orderType = this.productForm2.value.orderType;
          // this.newFooditem.paymentOptions.cashOnDelivery = this.productForm2.value.cashOnDelivery;
          // this.newFooditem.paymentOptions.onlinePayment = this.productForm2.value.onlinePayment;
          this.newFooditem.deliveryOptions.takeAway = this.productForm2.value.takeAway;
          this.newFooditem.deliveryOptions.homeDelivery = this.productForm2.value.homeDelivery;
          this.newFooditem.deliveryOptions.dineIn = this.productForm2.value.dineIn;
          console.log('Completed Step 2: Added location data ', this.newFooditem);
          break;
        }
        default: {
          const point = this.autoComplete.addressFromGooleMap;
          this.newFooditem.coordinates = new firebase.firestore.GeoPoint(point.location.lat(), point.location.lng());
          this.newFooditem.address = point.address;
          // this.dataService.createProduct(this.newFooditem);
          console.log('Completed Step 2: Added location data ', this.newFooditem);
          // this.product.createProduct(this.newFooditem);
          break;
        }
      }
    } else { console.log('User moved back to previous step'); }
  }



  canDeactivate(): boolean {
    if (!this.canNavigateAway) {
      // Run dialog service code here to set canNavigateAway to true or false
    this.canNavigateAway = !!this.dialogService.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
  }

  getImageUrls(event: any) {
    console.log('Image Urls: ', event.data);
  }

  prepareProduct() {

  }

  ngOnInit() {
  }

  createFooditem(stepper) {
    this.dataService.createProduct(this.newFooditem, this.newFooditem.id).then(
      rep => {
        console.log('New fooditem created!');
      },
      error => {
        console.log('error: Fooditem not created: ', error);
      }
    );
    console.log('TODO: this.dataService.createProduct(this.newFooditem);', stepper.selectedIndex);
    this.canNavigateAway = true;
    this.router.navigate(['product/list']);
  }

}
