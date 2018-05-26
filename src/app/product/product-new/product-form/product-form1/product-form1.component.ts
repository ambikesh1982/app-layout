import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form1',
  templateUrl: './product-form1.component.html',
  styleUrls: ['./product-form1.component.scss']
})
export class ProductForm1Component implements OnInit {

  @Input() productForm: FormGroup;

  foodCategories: string[];
  foodCuisine: string[];
  foodServing: (string|number)[];

  constructor() {
    // Metadata... Setting up form options.
    this.foodCategories = [
      'Main Course',
      'Starter',
      'Breakfast',
      'Snacks',
      'Dessert/Sweet',
      ];

    this.foodCuisine = [
      'North Indian',
      'South Indian',
      'Punjabi',
      'Mughlai',
      'Arebic',
      'Chinese',
      'Continental',
      'Italian'];

    this.foodServing = [1, 2, 3, 4, 'More'];
  }

  ngOnInit() {
  }

}
