import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;

  // Metadata...
  foodCategories = ['Main Course', 'Starter', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Sweet', 'Bakery'];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', ];
  foodServing = [1, 2, 3, 4, 'More'];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    // User input values
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      price: [, Validators.required],
      serving: [1, Validators.required],
      isNonVeg: true,
      category: '',
      cuisine: '',
      cashOnDelivery: true,
      onlinePayment: false,
      takeAway: true,
      homeDelivery: false,
      dineIn: false,
    });
  }


  ngOnInit() {
  }

}
