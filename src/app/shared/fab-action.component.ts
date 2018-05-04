import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-fab-action',
  template: `
    <div *ngIf="layoutService.fabActionIcon$|async as fabIcon">
            <button mat-fab class="mat-elevation-z4">
                <mat-icon>{{fabIcon}}</mat-icon>
            </button>
        </div>
  `,
  styles: []
})
export class FabActionComponent implements OnInit {

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
  }

}
