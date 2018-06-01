import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form2',
  templateUrl: './product-form2.component.html',
  styleUrls: ['./product-form2.component.scss']
})
export class ProductForm2Component implements OnInit {

  @Input() productForm: FormGroup;

  orderTimeSliderValue: number;
  orderTimeSliderRange: number;
  orderTimeSliderStep: number;
  orderTimeUnit: string;

  daysOfWeek = ['All Days', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

  constructor() {
    this.orderTimeSliderValue = 30;
    this.orderTimeSliderRange = 120; // default set to 2 hr for instant post
    this.orderTimeSliderStep = 30;
    this.orderTimeUnit = 'minutes';
   }

  setOrderBeforeRange(eventValue: any) {
    switch (eventValue) {
      case 'instant':
        this.orderTimeSliderValue = 30;
        this.orderTimeSliderRange = 120;
        this.orderTimeSliderStep = 30;
        this.orderTimeUnit = 'minutes';
        break;
      case 'preOrder':
        this.orderTimeSliderValue = 4;
        this.orderTimeSliderRange = 24;
        this.orderTimeSliderStep = 4;
        this.orderTimeUnit = 'hours';
        break;
      default:
        this.orderTimeSliderValue = 30;
        this.orderTimeSliderRange = 120;
        this.orderTimeSliderStep = 30;
        this.orderTimeUnit = 'minutes';
        break;
    }
    console.log('Oreder before slider range is set to :', eventValue);
  }

  ngOnInit() {
  }

}
