import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Fooditem } from '../../../core/models';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription, Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map, catchError, mergeMap, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  completed: boolean;

  maxFileUploadCount: number;
  selectedFileCount: number;

  /** STORAGE **/
  storagePath: string;
  imageURLs: string[];
  images: string[];
  previewURL: string;
  uploadPercent$: Observable<number>;
  downloadURL$: Observable<string>;
  downloadURLs: Observable<string>[];

  subscription: Subscription;

  constructor(private dataService: DataService, private storage: AngularFireStorage ) {
    this.storagePath = 'foodz9';
    this.imageURLs = [];
    this.images = [];
    this.maxFileUploadCount = 4;
    this.selectedFileCount = 0;
    this.downloadURL$ = null;
    this.downloadURLs = [];
  }

  // <Storage...>
  fileController(imageFiles: FileList) {
    if (imageFiles[0]) {

      const image = imageFiles[0];
      const imagePath = `${this.storagePath}/${this.productId}/${new Date().getTime()}_${image.name}`;
      const fileRef = this.storage.ref(imagePath);
      const task = this.storage.upload(imagePath, image);

      // Watch file upload process...
      this.uploadPercent$ = task.percentageChanges();

      // Get download url
      this.subscription = task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL$ = fileRef.getDownloadURL().pipe(
            map(url => {
              console.log('From downLoadURL.pipe', url);
              this.previewURL = url;
              this.imageURLs.push(url);
              this.images.push(url);
              this.manageFileCount(imageFiles.length);
              return url;
            })
          );
        })
      ).subscribe();
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

  ngOnInit() {
    console.log('from ngOnInit');
  }

  ngOnDestroy() {
    console.log('from ngOnDestroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
