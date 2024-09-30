import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { NodeTreeComponent } from './node-tree/node-tree.component';
import { MaterialModule } from '../material/material.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { NodeCreationComponent } from './node-creation/node-creation.component';
import { NodeDeletionComponent } from './node-deletion/node-deletion.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NodeDetailsComponent,
    NodeTreeComponent,
    NodeCreationComponent,
    NodeDeletionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AdminModule { }
