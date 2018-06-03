import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { Fooditem } from '../../../core/models';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, tap, map } from 'rxjs/operators';


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
  images: { path: string, url: string }[];
  uploadPercent$: Observable<number>;

  // previewURL$: Observable<string>;
  // previewURL$: any;
  preview: { path: string, url: string };
  upload$;

  subscription: Subscription;

  constructor(private dataService: DataService, private storage: AngularFireStorage) {
    this.storagePath = 'foodz9test';
    this.images = [];
    this.maxFileUploadCount = 4;
    this.selectedFileCount = 0;
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
      // this.subscription = uploadTask.snapshotChanges().pipe(
      //   tap( snap => {
      //     if (snap.bytesTransferred === snap.totalBytes) {
      //       this.manageFileCount(imageFiles.length);
      //     }
      //   }),
      //   finalize(() => {
      //     this.previewURL$ = storageRef.getDownloadURL();
      //     this.images.push({ path: imagePath, url: this.pre});
      //     this.downloadURL$.push(this.previewURL$);
      //       })
      // ).subscribe();

      // Get download url
      this.subscription = uploadTask.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            this.manageFileCount(imageFiles.length);
          }
        }),
        finalize(() => {
          this.upload$ = storageRef.getDownloadURL().pipe(
            map( (url: string) => {
              if ( url ) {
                this.preview = { path: imagePath, url: url };
                this.images.push(this.preview);
              }
            })
          );
        })
      ).subscribe();
    }
  }

  deleteImage(img: any) {
    const index = this.images.indexOf(img);
    console.log('Image index: ', index, ': ', img);
    if (index !== -1) {
      // Delete the image from the storage
      this.storage.ref(this.images[index].path).delete();
      // Remove the image from the images array
      this.images.splice(index, 1);
      this.preview = this.images[0];
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
