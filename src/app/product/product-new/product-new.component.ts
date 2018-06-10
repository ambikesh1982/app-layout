import { Component, OnInit, ViewChild, OnDestroy, Input, OnChanges } from '@angular/core';
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

export class ProductNewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() fooditemToBeModified: Fooditem;
  isNewFooditem: boolean;
  tempFooditem: Fooditem;
  newFooditem: Fooditem;
  productForm: FormGroup;
  canNavigateAway: boolean;
  currentAppUser: AppUser;
  imageUploadDone: boolean;

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
    this.isNewFooditem = true;
    this.imageUploadDone = false;
  }

  // Angular calls ngOnChanges() after constructor call and before ngOnInit()
  // This method will be called each time the @Input value changes.
  ngOnChanges() {
    this.isNewFooditem = false;
    this.imageUploadDone = true;
    console.log('#### from ngOnChanges ####');
  }

  ngOnInit() {
    if (this.isNewFooditem) {
      this.newFooditem = this.intializeNewFooditem(); // Initialize New Fooditem with default values

      this.createForm();

      if (this.currentAppUser.geoInfo) {
        this.patchUserAddress(this.currentAppUser.geoInfo);
      }

      console.log('Newly initialize fooditem >>>>', this.newFooditem);
    } else {
      this.createForm();
      this.newFooditem = this.rebuildProductForm(this.fooditemToBeModified);
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
      geoInfo: {},
      createdAt: new Date()
    };
  }

  rebuildProductForm(fooditem: Fooditem): Fooditem {
    console.log('Populating productForm with input fooditem data.', fooditem);

    Object.keys(this.productForm.get('form1').value).forEach(item => {
      if (this.productForm.get(`form1.${item}`)) {
        this.productForm.get(`form1.${item}`).patchValue(fooditem[item]);
      }
    });

    Object.keys(this.productForm.get('form2').value).forEach(item => {
      if (this.productForm.get(`form2.${item}`)) {
        this.productForm.get(`form2.${item}`).patchValue(fooditem[item]);
      }
    });

    this.productForm.get('addressForm').patchValue({
        autoAddressFromMap: fooditem.geoInfo.autoAddressFromMap,
        addressFromUser:    fooditem.geoInfo.addressFromUser,
      });
    return fooditem;
  }

  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
      form1: this.formBuilder.group({
        title:          ['', Validators.required],
        description:    '',
        price:          [0.0, Validators.required],
        serving:        [1, Validators.required],
        isNonVeg:       [true, Validators.required],
        category:       ['', Validators.required],
        cuisine:        ['', Validators.required],
        cashOnDelivery: [true, Validators.required],
        onlinePayment:  [false, Validators.required],
      }),
      form2: this.formBuilder.group({
        orderType:      ['instant', Validators.required],
        orderTime:      ['', Validators.required],
        availability:   [['All Days'], Validators.required],
        takeAway:       [true, Validators.required],
        homeDelivery:   [false, Validators.required],
        dineIn:         [false, Validators.required],
      }),
      addressForm: this.formBuilder.group({
        autoAddressFromMap: ['', Validators.required],
        addressFromUser: ['', Validators.required],
      })
    });
  }

  patchUserAddress(geoInfo: IGeoInfo) {
    this.productForm.get('addressForm').patchValue(
      {
        autoAddressFromMap: geoInfo.autoAddressFromMap,
        addressFromUser: geoInfo.addressFromUser
      });
  }

  prepareFooditem(fooditemForm: FormGroup) {
    console.log('#### From prepareFooditem ####');

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
    this.newFooditem.cashOnDelivery = fooditemForm.get('form1.cashOnDelivery').value;
    this.newFooditem.onlinePayment = fooditemForm.get('form1.onlinePayment').value;

    // 3. User input: Formdata (form2)
    this.newFooditem.orderType = fooditemForm.get('form2.orderType').value;
    this.newFooditem.orderTime = fooditemForm.get('form2.orderTime').value;
    this.newFooditem.availability = fooditemForm.get('form2.availability').value;
    this.newFooditem.takeAway = fooditemForm.get('form2.takeAway').value;
    this.newFooditem.homeDelivery = fooditemForm.get('form2.homeDelivery').value;
    this.newFooditem.dineIn = fooditemForm.get('form2.dineIn').value;

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

    if (!this.currentAppUser.geoInfo) {
      this.updateUserGeoInfo(this.currentAppUser.uid, this.autoComplete.geoInfo);
    }

    console.log('Fooditem to be saved >>>> ', this.newFooditem);
    if (this.productForm.status === 'VALID') {
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
    this.dataService.updateUserData(uid, { geoInfo: geoInfo });
  }

  // Stop user from accidently navigation away from this page.
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.canNavigateAway) {
      return this.dialogService.openDialog('Discard changes for this Product?');
    }
    return this.canNavigateAway;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    console.log('#### From ngOnDestroy ####');
    if (!this.canNavigateAway) {
      console.log();
      // if (this.upload.imagesAdded) {
      //   this.cleanupOnCancel(this.upload.imageAdded);
      // }
    } else {
      // if (this.upload.imagesDeleted) {
      //   this.cleanupOnSave(this.upload.imagesDeleted);
      // }
    }
  }

  imageUploadCompleted(data: any) {
    this.newFooditem.images = data;
  }

}
