import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dp: string;
  constructor(private dialogRef: MatDialogRef<DialogComponent>) {}


  onNoClick(): void {
    this.dialogRef.close();
    console.log('NO clicked');
  }

  onYesClick(): void {
    this.dialogRef.close();
    console.log('YES clicked');
  }

  ngOnInit() {
  }

}
