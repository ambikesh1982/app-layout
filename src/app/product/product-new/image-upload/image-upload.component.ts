import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Fooditem } from '../../../core/models';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, tap } from 'rxjs/operators';


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
  images: string[];
  uploadPercent$: Observable<number>;
  downloadURL$: Observable<string>[];
  previewURL$: Observable<string>;

  subscription: Subscription;

  constructor(private dataService: DataService, private storage: AngularFireStorage ) {
    this.storagePath = 'foodz9';
    this.images = [];
    this.maxFileUploadCount = 4;
    this.selectedFileCount = 0;
    this.downloadURL$ = [];
  }

  // <Storage...>
  fileController(imageFiles: FileList) {
    console.log('From fileController');
    if (imageFiles[0]) {

      const image = imageFiles[0];
      const imagePath = `${this.storagePath}/${this.productId}/${new Date().getTime()}_${image.name}`;
      const storageRef = this.storage.ref(imagePath);
      const uploadTask = this.storage.upload(imagePath, image);

      // Watch file upload process...
      this.uploadPercent$ = uploadTask.percentageChanges();

      // Get download url
      this.subscription = uploadTask.snapshotChanges().pipe(
        tap( snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            this.images.push(imagePath);
            this.manageFileCount(imageFiles.length);
          }
        }),
        finalize(() => {
          this.previewURL$ = storageRef.getDownloadURL();
          this.downloadURL$.push(this.previewURL$);
            })
      ).subscribe();
    }
  }

  deleteImage(img: Observable<string>) {
    const index = this.downloadURL$.indexOf(img);
    if (index !== -1) {
      this.downloadURL$.splice(index, 1);
      this.previewURL$ = this.downloadURL$[0];
      this.storage.ref(this.images[index]).delete();
      this.images.splice(index, 1);
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
