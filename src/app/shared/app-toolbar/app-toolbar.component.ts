import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Location } from '@angular/common';
import { AuthService } from '../../core/auth.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})

export class AppToolbarComponent implements OnInit, OnChanges {

  @Input() sidenavRef: any;

  constructor(
    public layoutService: LayoutService,
    private auth: AuthService,
    private location: Location) {
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  goBack() {
    this.location.back();
    console.log('triggered from goBack icon');
  }

}
