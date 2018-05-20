import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Fooditem } from '../../../core/models';
import * as firebase from 'firebase/app';
import { FormGroup } from '@angular/forms';
import { LocationService } from '../../../core/location.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() fooditem: Fooditem;
  @Input() map: any;

  pos: Position;

  @ViewChild('mapElm') mapElement;

  // newFooditem: Fooditem = {
  //   address: '161 Hougang Street 11, Block 161, Singapore 530161',
  //   category: 'Main Course',
  //   coordinates: new firebase.firestore.GeoPoint( 1.3525869, 103.87865039999997 ),
  //   cuisine: 'South Indian',
  //   deliveryOptions: { takeAway: true, homeDelivery: false, dineIn: false },
  //   description: 'ABCD',
  //   id: '7fb28ksFLH7x4dWO6drr',
  //   images: [
  //     './assets/images/chicken-65.jpg',
  //     './assets/images/egg-curry.jpg',
  //     './assets/images/fried-rice.png',
  //     './assets/images/Jalebi.jpeg'
  //   ],
  //   isNonVeg: true,
  //   paymentOptions: { cashOnDelivery: true, onlinePayment: false },
  //   price: 100,
  //   serving: 1,
  //   title: 'ABCD' };



  previewURL: string;
  @ViewChild('mapElement') mapElm: ElementRef;

  constructor( private locationService: LocationService) {
  }

  ngOnInit() {
    // this.previewURL = this.fooditem.images[0];
  }

  ngAfterViewInit() {
    // console.log('xxxxx1', this.fooditem.coordinates.latitude);
    // if (this.fooditem.coordinates) {
    //   // const pos = new Position();
    //   this.locationService.createMap(this.mapElement, this.fooditem.coordinates.latitude, this.fooditem.coordinates.longitude);
    //   console.log('Map Element: ', this.mapElement);
    // }
  }

  ngOnChanges() {
    console.log('From ngOnChanges');

    // this.locationService.createMap(this.mapElement, this.fooditem.coordinates.latitude, this.fooditem.coordinates.longitude);
  }

  }




