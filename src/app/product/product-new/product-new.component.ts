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

    if (this.currentAppUser.geoInfo) {
      this.patchUserAddress(this.currentAppUser.geoInfo);
    }

    // this.subscription = this.productForm.valueChanges.pipe(
    //   debounceTime(5000)
    // ).subscribe( value => {
    //   console.log('productForm2 value: ', value);
    // });
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
      form1: this.formBuilder.group({
        title: ['', Validators.required],
        description: '',
        price: [0.0, Validators.required],
        serving: [1, Validators.required],
        isNonVeg: [true, Validators.required],
        category: ['', Validators.required],
        cuisine: ['', Validators.required],
        cashOnDelivery: [true, Validators.required],
        onlinePayment: [false, Validators.required],
      }),
      form2: this.formBuilder.group({
        orderType: 'instant',
        orderTime: '',
        availability: [['All Days'], Validators.required],
        takeAway: true,
        homeDelivery: false,
        dineIn: false,
      }),
      addressForm: this.formBuilder.group({
        autoAddressFromMap: ['', Validators.required],
        addressFromUser: ['', Validators.required],
      })
    });
  }

  patchUserAddress(geoInfo: IGeoInfo) {
      this.productForm.get('addressForm').patchValue(
        { autoAddressFromMap: geoInfo.autoAddressFromMap,
          addressFromUser: geoInfo.addressFromUser
        });
  }

  prepareFooditem(fooditemForm: FormGroup) {
    // 1. User input: urls from image upload component
    this.newFooditem.images = this.upload.images;

    // 2. User input: Formdata (form1)
    this.newFooditem.title = fooditemForm.get('form1.title').value;
    this.newFooditem.description = fooditemForm.get('form1.description').value;
    this.newFooditem.isNonVeg = fooditemForm.get('form1.isNonVeg').value;
    this.newFooditem.price = fooditemForm.get('form1.price').value;
    this.newFooditem.serving = fooditemForm.get('form1.serving').value;
    this.newFooditem.category = fooditemForm.get('form1.category').value;
    this.newFooditem.cuisine = fooditemForm.get('form1.cuisine').value;
    this.newFooditem.paymentOptions.cashOnDelivery = fooditemForm.get('form1.cashOnDelivery').value;
    this.newFooditem.paymentOptions.onlinePayment = fooditemForm.get('form1.onlinePayment').value;

    // 3. User input: Formdata (form2)
    this.newFooditem.orderType = fooditemForm.get('form2.orderType').value;
    this.newFooditem.orderTime = fooditemForm.get('form2.orderTime').value;
    this.newFooditem.availability = fooditemForm.get('form2.availability').value;
    this.newFooditem.deliveryOptions.takeAway = fooditemForm.get('form2.takeAway').value;
    this.newFooditem.deliveryOptions.homeDelivery = fooditemForm.get('form2.homeDelivery').value;
    this.newFooditem.deliveryOptions.dineIn = fooditemForm.get('form2.dineIn').value;

    // 4. User input: Formdata (addressForm)
    if (this.currentAppUser) {
      this.newFooditem.geoInfo = this.currentAppUser.geoInfo;
    } else {
      this.autoComplete.geoInfo.addressFromUser = fooditemForm.get('addressForm.addressFromUser').value;
      this.newFooditem.geoInfo = this.autoComplete.geoInfo;
    }

    // 5. Add a timestamp
    this.newFooditem.createdAt = new Date();

  }

  // Save fooditem to firebase and navigate back to list page
  createFooditem() {
    console.log('ProductForm before prepareFooditem >>>>', this.newFooditem);
    this.prepareFooditem(this.productForm);
    console.log('ProductForm after prepareFooditem >>>>', this.newFooditem);

    if ( !this.currentAppUser.geoInfo) {
      this.updateUserGeoInfo(this.currentAppUser.uid, this.autoComplete.geoInfo);
    }

    console.log('Fooditem to be saved >>>> ', this.newFooditem);
    if ( this.productForm.status === 'VALID') {
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
  }

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
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
    console.log('#### From ngOnDestroy ####');
    if (!this.canNavigateAway) {
      this.cleanupOnCancel();
    }
  }

}
