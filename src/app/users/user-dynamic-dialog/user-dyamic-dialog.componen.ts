import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dyamic-dialog',
  templateUrl: './user-dyamic-dialog.component.html',
  styleUrls: ['./user-dyamic-dialog.component.css']
})
export class UserDyamicDialogComponent implements OnInit {

  /** userDynamictForm */
  public userDynamictForm!: FormGroup;

  /**
   * constructor
   * @param {FormBuilder} formBuilder 
   * @param {MAT_DIALOG_DATA} passedData 
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public passedData: any
  ) { }

  /** ngOnInit */
  ngOnInit(): void {
    this.initDynamicForm();

    if (this.passedData.mode === 'edit') {
      this.userDynamictForm.setValue({
        email: this.passedData.user.email,
        first_name: this.passedData.user.first_name,
        last_name: this.passedData.user.last_name,
        avatar: this.passedData.user.avatar,
      })
    }
  }

  /**
   * initDynamicForm
   * @description function to initialize form
   * @returns void
   */
  public initDynamicForm(): void {
    this.userDynamictForm = this.formBuilder.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['', Validators.required],
    })
  }
}
