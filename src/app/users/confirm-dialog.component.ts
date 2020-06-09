import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    template:`
    <h2>Are You Sure?</h2>
    <button  mat-raised-button color="warn" [mat-dialog-close]="true">Save</button>
    <button mat-raised-button type="button"  [mat-dialog-close]="false">cancel</button>
    `

})
export class ConfirmDialoge {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData:any) {}
}