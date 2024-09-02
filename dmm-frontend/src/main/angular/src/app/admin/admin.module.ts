import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { NodeTreeComponent } from './node-tree/node-tree.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    NodeDetailsComponent,
    NodeTreeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AdminModule { }
