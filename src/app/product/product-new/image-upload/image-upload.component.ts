import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Fooditem } from '../../../core/models';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  maxFileUploadCount: number;
  selectedFileCount: number;

  /** STORAGE **/
  storagePath: string;
  imageURLs: string[];
  downloadURL$: Observable<string>;
  previewURL: string;
  uploadPercent$: Observable<number>;

  subscription: Subscription;

  constructor( private dataService: DataService ) {
    this.storagePath = 'foodz9';
    this.imageURLs = [];
    // this.fooditem.id = dataService.getFirebaseDocumentKey();
    this.maxFileUploadCount = 4;
    this.selectedFileCount = 0;
  }

  // <Storage...>
  fileController(imageFiles: FileList) {
    if (imageFiles[0]) {

      const file = imageFiles[0];
      const storagePath = `${this.storagePath}/${this.productId}/${new Date().getTime()}_${file.name}`;
      const uploadTask = this.dataService.uploadImage(file, storagePath);

      this.subscription = uploadTask.subscribe(
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

  deleteImage(img) {
    const index = this.imageURLs.indexOf(img);
    if (index !== -1) {
      this.imageURLs.splice(index, 1);
      this.previewURL = this.imageURLs[0];
      this.manageFileCount(-1);
    }
  }

  manageFileCount(counter: number) {
    this.selectedFileCount = this.selectedFileCount + counter;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}