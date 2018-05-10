import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  message: string;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.description;
  }

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
