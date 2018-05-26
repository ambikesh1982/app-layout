import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form2',
  templateUrl: './product-form2.component.html',
  styleUrls: ['./product-form2.component.scss']
})
export class ProductForm2Component implements OnInit {

  @Input() productForm: FormGroup;

  daysOfWeek = ['All Days', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

  constructor() { }

  ngOnInit() {
  }

}
