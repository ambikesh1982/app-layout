import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }


 openDialog(message: string): MatDialogRef<DialogComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
    data => {console.log('Dialog output:', message);
  });
    return dialogRef;
  }


  }
  /*
  confirm(message?: string): boolean {
    console.log('canDeactivate Guard');
    return window.confirm(message || 'Are you sure?');
  }*/
}
