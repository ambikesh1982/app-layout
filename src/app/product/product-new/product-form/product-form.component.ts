import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;

  // Metadata...
  foodCategories = ['Main Course', 'Starter', 'Breakfast', 'Snacks', 'Dessert/Sweet', 'Roti/Bread', 'Rice', 'Salad', 'Soup', 'Bakery'];
  foodCuisine = ['North Indian', 'South Indian', 'Punjabi', 'Mughlai', 'Arebic', 'Chinese', 'Continental', 'Italian' ];
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
      // takeAway: true,
      // homeDelivery: false,
      // dineIn: false,
    });
  }


  ngOnInit() {
  }

}
