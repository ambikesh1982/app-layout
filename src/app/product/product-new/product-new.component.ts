import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { Observable, of } from 'rxjs';
import { Fooditem } from '../../core/models';
import { DataService } from '../../core/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {

// Viewchild accessors to access properties and methods of child component directly from parent component.
  @ViewChild('upload') upload;
  @ViewChild('form') form;
  @ViewChild('autoComplete') autoComplete;

  newFooditem: Fooditem;

  daysOfWeek = ['All days', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

  productForm: FormGroup;
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
    this.newFooditem.id = dataService.getFirebaseDocumentKey();
    }

  ngOnInit() {
    this.createForm();
    this.productForm.valueChanges.pipe(
      debounceTime(5000)
    ).subscribe( value => {
      console.log('productForm2 value: ', value);
    });
  }

  populateImageURLs(fooditem: Fooditem) {
    fooditem.images = this.upload.images;
  }

  populateAddress(fooditem: Fooditem) {
    const point = this.autoComplete.addressFromGooleMap;
    fooditem.coordinates = new firebase.firestore.GeoPoint(point.location.lat(), point.location.lng());
    fooditem.autoAddressFromMap = point.address;
  }







  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
      title:          ['', Validators.required],
      description:    '',
      price:          [0.0, Validators.required],
      serving:        [1, Validators.required],
      isNonVeg:       true,
      category:       '',
      cuisine:        '',
      cashOnDelivery: true,
      onlinePayment:  false,
      orderType:      'instant',
      orderTime:      '',
      availability:   'All Days',
      takeAway:       true,
      homeDelivery:   false,
      dineIn:         false,
      autoAddressFromMap: '',
      addressFromUser: '',
    });
  }

// Save fooditem to firebase and navigate back to list page
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

  // Stop user from accidently navigation away from this page.
  canDeactivate(): boolean {
    if (!this.canNavigateAway) {
      // Run dialog service code here to set canNavigateAway to true or false
      this.canNavigateAway = !!this.dialogService.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
  }

}
