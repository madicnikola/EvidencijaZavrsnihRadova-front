import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ErrorDialogComponent, {
  //     width: '250px',
  //     data: {name: this.title, message: this.errorMessage}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(value => {
  //     console.log('The dialog was closed');
  //     this.errorMessage = value;
  //   });
  // }

}
