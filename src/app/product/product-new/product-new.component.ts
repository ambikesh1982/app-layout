import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from '../../core/auth.service';
import { DialogService } from '../../core/dialog.service';
import { DataService } from '../../core/data.service';

import { Fooditem, AppUser, IGeoInfo } from '../../core/models';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit, OnDestroy {

  newFooditem: Fooditem;
  productForm: FormGroup;
  canNavigateAway: boolean;
  currentAppUser: AppUser;

  subscription: Subscription;

  // Viewchild accessors to access properties and methods of child component directly from parent component.
  @ViewChild('upload') upload;
  @ViewChild('autoComplete') autoComplete;

  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) {
    this.currentAppUser = this.auth.currAppUser;
    this.canNavigateAway = false;
    this.newFooditem = this.intializeNewFooditem(); // Initialize New Fooditem with default values
    console.log('Newly initialize fooditem >>>>', this.newFooditem);
  }

  ngOnInit() {
    this.createForm();
    this.patchUserAddress();

    this.subscription = this.productForm.valueChanges.pipe(
      debounceTime(5000)
    ).subscribe( value => {
      if (this.currentAppUser.geoInfo ) {
        this.productForm.get('autoAddressFromMap').disable();
        this.productForm.get('addressFromUser').disable();
      } else {
        this.productForm.get('autoAddressFromMap').enable();
        this.productForm.get('addressFromUser').enable();
      }
      console.log('productForm2 value: ', value);
    });
  }

  intializeNewFooditem(): Fooditem {
    return {
      id: this.dataService.getFirebaseDocumentKey(),
      createdBy: this.currentAppUser.uid,
      images: [],
      availability: [],
      paymentOptions: {},
      deliveryOptions: {},
      geoInfo: {},
      createdAt: new Date()
    };
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
      // geoInfoFromAppUser: this.currentAppUser.geoInfo,
      autoAddressFromMap: ['',  Validators.required],
      addressFromUser: ['', Validators.required],
    });
  }

  patchUserAddress() {
    if (this.auth.currAppUser.geoInfo) {
      console.log('geoInfo form user profile: ', this.currentAppUser.geoInfo);
      this.productForm.patchValue(
        { autoAddressFromMap: this.currentAppUser.geoInfo.autoAddressFromMap,
          addressFromUser: this.currentAppUser.geoInfo.addressFromUser
        });
    } else {
      console.log('#### activate place autoComplete #### ');
    }
  }

  prepareFooditem(fooditemForm: FormGroup) {
    // User input: urls from image upload component
    // this.newFooditem.images = this.upload.images.map(image => {
    //   return image.path;
    // });
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

    if (this.currentAppUser) {
      this.newFooditem.geoInfo = this.currentAppUser.geoInfo;
    } else {
      this.autoComplete.geoInfo.addressFromUser = fooditemForm.value.addressFromUser;
      this.newFooditem.geoInfo = this.autoComplete.geoInfo;
    }
    // this.newFooditem.autoAddressFromMap = fooditemForm.value.autoAddressFromMap;
    // this.newFooditem.addressFromUser = fooditemForm.value.addressFromUser;

    // User input: geopoint from google place autocomplete
    // const point = this.autoComplete.addressFromGooleMap;
    // this.newFooditem.coordinates = new firebase.firestore.GeoPoint(point.location.lat(), point.location.lng());
    // const point = this.autoComplete.addressFromGooleMap;
    // this.newFooditem.coordinates = this.autoComplete.userGeoInfo.coordinates;

    // Add a timestamp
    this.newFooditem.createdAt = new Date();

  }

  // Save fooditem to firebase and navigate back to list page
  createFooditem() {
    this.prepareFooditem(this.productForm);

    if ( !this.currentAppUser.geoInfo) {
      this.updateUserGeoInfo(this.currentAppUser.uid, this.autoComplete.geoInfo);
    }

    console.log('Fooditem to be saved >>>> ', this.newFooditem);
    this.dataService.createProduct(this.newFooditem, this.newFooditem.id).then(
      rep => {
        console.log('#### New fooditem created #### :', this.newFooditem);
        this.canNavigateAway = true;
        console.log('New Fooditme after upload: ', this.newFooditem);
        this.router.navigate(['/']);
      },
      error => {
        console.log('error: Fooditem not created >>>> ', error);
      }
    );
  }

  // handleGeoInfo(geoInfo: IGeoInfo, updateUserAddress: boolean) {
  //   if (this.currentAppUser.geoInfo && )
  // }

  updateUserGeoInfo(uid: string, geoInfo: IGeoInfo) {
    this.dataService.updateUserData(uid, {geoInfo: geoInfo});
  }

  cleanupOnCancel() {
      this.upload.images.forEach( image => {
        this.storage.ref(image.path).delete();
        console.log('Cleanup: Delete the image from fb: ', image);
      });
  }

  // Stop user from accidently navigation away from this page.
  canDeactivate(): Observable<boolean>| boolean {
    if ( !this.canNavigateAway ) {
      return this.dialogService.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('#### From ngOnDestroy ####');
    if (!this.canNavigateAway) {
      this.cleanupOnCancel();
    }
  }

}
