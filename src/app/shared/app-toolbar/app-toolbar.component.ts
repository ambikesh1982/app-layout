import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})

export class AppToolbarComponent implements OnInit, OnChanges {

  @Input() sidenavRef: any;
  @Input() title: any;

  constructor( public layoutService: LayoutService,
    private location: Location) {
  }

  ngOnInit() {
  //   this.routerData = this.router.events
  //     .filter((event) => event instanceof NavigationEnd)
  //     .map(() => this.activatedRoute)
  //     .map((route) => {
  //       if (route.firstChild) {
  //         route = route.firstChild;
  //       }
  //       return route;
  //     })
  //     .filter((route) => route.outlet === 'primary')
  //     .mergeMap((route) => {
  //       return route.data;
  //     });
  }

  ngOnChanges() {

  }

  goBack() {
    this.location.back();
    console.log('triggered from goBack icon');
  }

}
