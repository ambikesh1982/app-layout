import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-fab-action',
  template: `
    <div *ngIf="showFabAction">
            <button mat-fab class="mat-elevation-z4">
                <mat-icon>{{fabIcon}}</mat-icon>
            </button>
        </div>
  `,
  styles: []
})
export class FabActionComponent implements OnInit {

  // fabAction = ['FAB_ACTION_SEARCH', 'FAB_ACTION_ADDTOCART', 'FAB_ACTION_POST', 'FAB_ACTION_SUBMIT'];

  fabIcon: string;
  showFabAction: boolean;
  constructor(public layoutService: LayoutService) {
    this.addActionToFab();
  }

  addActionToFab() {
    this.layoutService.fabAction$.subscribe( fabAction => {
      this.showFabAction = fabAction.showFabAction;
      switch (fabAction.fabAction) {
        case 'FAB_ACTION_SEARCH':
          this.fabIcon = 'search';
          break;
        case 'FAB_ACTION_ADD2CART':
          this.fabIcon = 'add';
          break;
        case 'FAB_ACTION_NEXT':
          this.fabIcon = 'arrow_forward';
          break;
        case 'FAB_ACTION_CART_DONE':
          this.fabIcon = 'done';
          break;
        case 'FAB_ACTION_SIGNIN_OK':
          this.fabIcon = 'done';
          break;
        default:
          console.log('from case default:', fabAction);
          break;
      }
    });
  }

  ngOnInit() {
  }

}
