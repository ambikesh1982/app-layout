import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-footer-toolbar',
  template: `
    <mat-toolbar *ngIf="layoutService.showFooterToolbar" fxLayout="row wrap" fxLayoutAlign="space-between center">
            <button mat-icon-button>
              <mat-icon>arrow_backword</mat-icon>
            </button>
            Footer
            <button mat-icon-button>
              <mat-icon>arrow_forward</mat-icon>
            </button>
    </mat-toolbar>
  `
})
export class FooterComponent implements OnInit {

  constructor( public layoutService: LayoutService) { }

  ngOnInit() {
  }

}
