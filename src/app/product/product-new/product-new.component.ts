import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialog.service';
// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';
import { Fooditem } from '../../core/models';
import { DataService } from '../../core/data.service';
import { MatDialogRef } from '@angular/material/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})

export class ProductNewComponent implements OnInit {

  fooditem: Fooditem;

  maxFileUploadCount: number;
  selectedFileCount: number;

  /** STORAGE **/
  storagePath: string;
  imageURLs: string[];
  downloadURL$: Observable<string>;
  previewURL: string;
  uploadPercent$: Observable<number>;

  // Metadata...
  foodCategories = ['Main Course', 'Starter', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweet', 'Bakery'];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  foodServing = [1, 2, 3, 4, 'More'];



  constructor(
    public dialogService: DialogService,
    private dataService: DataService
  ) {
    this.fooditem = {}; // Create empty fooditem.
    this.fooditem.images = [];
    // this.fooditem.id = dataService.getFirebaseDocumentKey();
    this.fooditem.id = 'dummyIdToAvoidFirebaseCalls';
    }

  // 1. Upload photos (Max - 4) <AngularFireStorage.file-upload>
  // 2. Add fooditem details <Form>
  // 3. Add geo location (geocodes and Address) <Google maps placeAutoComplete>
  // 4. Review and post <AngularFireStore.push()>

  // <Form...>

  // </Form...>


  canDeactivate(): MatDialogRef<DialogComponent> {
    return this.dialogService.openDialog('Discard changes for this Product?');
  }

  ngOnInit() {
  }

}
