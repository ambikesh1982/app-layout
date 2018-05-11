<<<<<<< HEAD
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../shared/dialog.service';
=======
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
>>>>>>> 1cd0a98087fb7fe1e6311ba2594e8870ede2fc5d
// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';
import { Fooditem } from '../../core/models';
import { DataService } from '../../core/data.service';
<<<<<<< HEAD
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

=======
import { MatDialogRef } from '@angular/material/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
>>>>>>> 1cd0a98087fb7fe1e6311ba2594e8870ede2fc5d

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {


  @ViewChild('upload') upload;
  @ViewChild('form') form;
  @ViewChild('place') place;

  fooditem: Fooditem;

  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
  ) {
    this.fooditem = {}; // Create empty fooditem.
    this.fooditem.images = [];
    // this.fooditem.id = dataService.getFirebaseDocumentKey();
    this.fooditem.id = 'dummyIdToAvoidFirebaseCalls';
    }

  prepareDataFromStepper(stepperEvent: any) {
    console.log('stepperEvent: ', stepperEvent);
    if (stepperEvent.previouslySelectedIndex < stepperEvent.selectedIndex) {

      switch (stepperEvent.previouslySelectedIndex) {
        case 0: {
          // This executes when you move to step number 2.
          this.fooditem.images = this.upload.imageURLs;
          console.log('Completed Step 0: Added image array', this.upload.imageURLs);
          break;
        }
        case 1: {
          // This executes when you move to step number 3.
          console.log('Completed Step 1: Added form data ', this.form.productForm.value);
          break;
        }
        case 2: {
          // This executes when you move to step number 4.
          // With user address product data is finished.
          // Show previw of the fooditem and ask user to post or cancel.
          console.log('Completed Step 2: Added location data ', this.place);
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

  ngOnInit() {
  }

}
