import { Component, OnInit } from '@angular/core';
import { AppToolbar, FabAction, LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor( private layoutService: LayoutService) {
    const toolbar: AppToolbar = {
      showPageTitle: true,
      pageTitle: 'Please Sign-in to continue!',
      showCancelIcon: true
    };

    const fabAction: FabAction = {
      showFabAction: false,
      fabAction: 'FAB_ACTION_SIGNIN_OK'
    };

    this.layoutService.appToolBar$.next(toolbar);
    this.layoutService.fabAction$.next(fabAction);
  }

  ngOnInit() {
  }

}
