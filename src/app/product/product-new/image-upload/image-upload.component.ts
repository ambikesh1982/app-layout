import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Fooditem } from '../../../core/models';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';


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
      const fileRef = this.storage.ref(imagePath);
      const task = this.storage.upload(imagePath, image);

      // Watch file upload process...
      this.uploadPercent$ = task.percentageChanges();

      // Get download url
      this.subscription = task.snapshotChanges().pipe(
        finalize(() => {
          this.images.push(imagePath);
          this.previewURL$ = fileRef.getDownloadURL();
          this.downloadURL$.push(this.previewURL$);
          this.manageFileCount(imageFiles.length);
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
