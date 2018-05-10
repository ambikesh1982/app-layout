import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

//  openDialog(message: string): MatDialogRef<DialogComponent> {

  openDialog(message: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      dispalyMessage: message
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );
    return dialogRef;
  }
  /*
  confirm(message?: string): boolean {
    console.log('canDeactivate Guard');
    return window.confirm(message || 'Are you sure?');
  }*/
}
