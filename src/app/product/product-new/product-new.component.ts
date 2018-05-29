import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { DialogService } from '../../core/dialog.service';
import { Fooditem } from '../../core/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {

  newFooditem: Fooditem;
  productForm: FormGroup;
  canNavigateAway: boolean;

  // Viewchild accessors to access properties and methods of child component directly from parent component.
  @ViewChild('upload') upload;
  @ViewChild('autoComplete') autoComplete;

  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.canNavigateAway = false;
    console.log('Current application User >>>> ', this.auth.currUser.uid);

    const firebaseDocKey = dataService.getFirebaseDocumentKey();
    const crrentAppUserID = this.auth.currUser.uid;

    // Initialize New Fooditem with some default values
    this.newFooditem = {
      id: firebaseDocKey,
      createdBy: crrentAppUserID,
      images: [],
      availability: [],
      paymentOptions: {},
      deliveryOptions: {},
      createdAt: new Date()
    };

    console.log('Newly initialize fooditem >>>>', this.newFooditem);
  }

  ngOnInit() {
    this.createForm();

    this.productForm.valueChanges.pipe(
      debounceTime(5000)
    ).subscribe( value => {
      console.log('productForm2 value: ', value);
    });
  }

  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      price: [0.0, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: true,
      category: '',
      cuisine: '',
      cashOnDelivery: true,
      onlinePayment: false,
      orderType: 'instant',
      orderTime: '',
      availability: [['All Days'], Validators.required],
      takeAway: true,
      homeDelivery: false,
      dineIn: false,
      autoAddressFromMap: 'Ambikapur, Chhattisgarh, India',
      addressFromUser: ['', Validators.required],
    });
  }

  prepareFooditem(fooditemForm: FormGroup) {
    console.log('Images: ', this.upload.images);
    console.log('Extracting values from fooditem form:', fooditemForm.value);

    // User input: urls from image upload component
    this.newFooditem.images = this.upload.images;

    // User input: Formdata
    this.newFooditem.title = fooditemForm.value.title;
    this.newFooditem.description = fooditemForm.value.description;
    this.newFooditem.isNonVeg = fooditemForm.value.isNonVeg;
    this.newFooditem.price = fooditemForm.value.price;
    this.newFooditem.serving = fooditemForm.value.serving;
    this.newFooditem.category = fooditemForm.value.category;
    this.newFooditem.cuisine = fooditemForm.value.cuisine;
    this.newFooditem.paymentOptions.cashOnDelivery = fooditemForm.value.cashOnDelivery;
    this.newFooditem.paymentOptions.onlinePayment = fooditemForm.value.onlinePayment;
    this.newFooditem.orderType = fooditemForm.value.orderType;
    this.newFooditem.orderTime = fooditemForm.value.orderTime; // not hooked up yet: slider
    this.newFooditem.availability = fooditemForm.value.availability; // not hooked up yet: multiselect
    this.newFooditem.deliveryOptions.takeAway = fooditemForm.value.takeAway;
    this.newFooditem.deliveryOptions.homeDelivery = fooditemForm.value.homeDelivery;
    this.newFooditem.deliveryOptions.dineIn = fooditemForm.value.dineIn;
    this.newFooditem.autoAddressFromMap = fooditemForm.value.autoAddressFromMap;
    this.newFooditem.addressFromUser = fooditemForm.value.addressFromUser;

    // User input: geopoint from google place autocomplete
    const point = this.autoComplete.addressFromGooleMap;
    this.newFooditem.coordinates = new firebase.firestore.GeoPoint(point.location.lat(), point.location.lng());

    // Add a timestamp
    this.newFooditem.createdAt = new Date();

  }

  // Save fooditem to firebase and navigate back to list page
  createFooditem(stepper) {
    this.prepareFooditem(this.productForm);

    console.log('Fooditem to be saved >>>> ', this.newFooditem);
    this.dataService.createProduct(this.newFooditem, this.newFooditem.id).then(
      rep => {
        console.log('#### New fooditem created ####');
      },
      error => {
        console.log('error: Fooditem not created >>>> ', error);
      }
    );

    this.canNavigateAway = true;
    this.router.navigate(['product/list']);
    console.log('Newfooditem: ', this.newFooditem);
  }

  // Stop user from accidently navigation away from this page.
  canDeactivate(): Observable<boolean>| boolean {
    if ( !this.canNavigateAway ) {
      return this.dialogService.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
    }

}
