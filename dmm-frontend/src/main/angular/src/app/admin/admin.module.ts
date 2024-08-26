import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { NodesTreeComponent } from './nodes-tree/nodes-tree.component';



@NgModule({
  declarations: [
    NodeDetailsComponent,
    NodesTreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
