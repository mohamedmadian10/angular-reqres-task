import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { Material } from '../material.module/material.module.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    Material
  
  ],
  exports:[
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    Material
  ]
})
export class SharedModule { }
