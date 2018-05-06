import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../shared/dialog.service';
// tslint:disable-next-line:import-blacklist
import { Observable, of } from 'rxjs';
import { Fooditem } from '../../core/models';
import { DataService } from '../../core/data.service';

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

  constructor(
    public dialogService: DialogService,
    private dataService: DataService
  ) {
    this.storagePath = 'foodz9';
    this.imageURLs = [];
    this.fooditem = {}; // Create empty fooditem.
    // this.fooditem.id = dataService.getFirebaseDocumentKey();
    this.fooditem.id = 'dummyIdToAvoidFirebaseCalls';
    this.maxFileUploadCount = 4;
    this.selectedFileCount = 0;
  }

  // 1. Upload photos (Max - 4) <AngularFireStorage.file-upload>
  // 2. Add fooditem details <Form>
  // 3. Add geo location (geocodes and Address) <Google maps placeAutoComplete>
  // 4. Review and post <AngularFireStore.push()>

  // <Storage...>
  fileController(imageFiles: FileList) {
    if (imageFiles[0]) {

      const file = imageFiles[0];
      const storagePath = `${this.storagePath}/${this.fooditem.id}/${new Date().getTime()}_${file.name}`;
      const uploadTask = this.dataService.uploadImage(file, storagePath);

      uploadTask.subscribe(
        snapshot => {
          console.log('uploadTask downloadURL: ', snapshot.downloadURL);
          console.log('uploadTask uploadPercent: ', snapshot.bytesTransferred);
          if (snapshot.downloadURL) {
            this.previewURL = snapshot.downloadURL;
          }
        },
        error => {
          console.log('Error from uploadTask: ');
        },
        () => {
          this.imageURLs.push(this.previewURL);
          this.manageFileCount(imageFiles.length);
          console.log('uploadTask completed');
        });
    }
  }

  manageFileCount(counter: number) {
    this.selectedFileCount = this.selectedFileCount + counter;
  }

  showPreview(img) {
    this.previewURL = img;
  }


  // private uploadSingleFile(file: File) {
  //   const fileStoragePath = `${this.storagePath}/${this.fooditem.id}/${new Date().getTime()}_${file.name}`;
  //   this.task = this.storage.upload(fileStoragePath, file);
  //   this.downloadURL$ = this.task.downloadURL();
  //   this.uploadPercentage$ = this.task.percentageChanges();

  //   this.snapshot$ = this.task.snapshotChanges().pipe(
  //     tap(res => {
  //       console.log('Inside PIPE:', res);
  //       if (res.bytesTransferred === res.totalBytes) {
  //         this.atLeastOneImageAdded = true;
  //         this.images.push(res.downloadURL);
  //         this.previewImage = res.downloadURL;
  //         return Observable.of(null);
  //       }
  //     })
  //   );
  // }
  // </Storage...>


  // <Form...>

  // </Form...>


  canDeactivate(): Observable<boolean> | boolean {
    return this.dialogService.confirm('Discard changes for this Product?');
  }

  ngOnInit() {
  }

}
