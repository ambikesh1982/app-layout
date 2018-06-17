import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Location } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { AppCartService } from '../../app-cart/app-cart.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})

export class AppToolbarComponent implements OnInit, OnChanges {

  @Input() sidenavRef: any;
  cartSize: number;

  constructor(
    public cartService: AppCartService,
    public layoutService: LayoutService,
    private auth: AuthService,
    private location: Location,
  ) {
    this.cartService.getCartSize$.subscribe(
      size => {
        this.cartSize = size;
        console.log('Get cartSize: ', size);
    });
  }

  ngOnInit() {}

  ngOnChanges() {

  }

  goBack() {
    this.location.back();
    console.log('triggered from goBack icon');
  }

}
