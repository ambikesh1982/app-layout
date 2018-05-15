import { Component, OnInit } from '@angular/core';
import { Fooditem } from '../../core/models';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../core/data.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialogRef } from '@angular/material';
import { DialogService } from '../../core/dialog.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  fooditem$: Observable<Fooditem>;
  fooditems$: Observable<Fooditem[]>;
  fooditem: Fooditem;
  userName: string;

  constructor(
    // private productService: ProductService,
    private dataService: DataService,
    private dialogService: DialogService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // TODO: Unsubscribe the subscription to avoid memory leak.
    this.fooditem = this.route.snapshot.data['product'];
    console.log('Fooditem from resolver: ', this.fooditem);

<<<<<<< HEAD
    this.fooditems$ = this.dataService.getProductsByUser(this.userName);
=======
    // this.fooditems$ = this.dataService.getProductsByUser();
>>>>>>> accd71c67991292d46981e4dcb2d68e9a0902a65
  }
  canDeactivate(): MatDialogRef<DialogComponent> {
    return this.dialogService.openDialog('Discard changes for this Product?');
  }
}
