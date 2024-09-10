import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { NodeTreeComponent } from './node-tree/node-tree.component';
import { MaterialModule } from '../material/material.module';
import { ApiService } from '../services/api.service';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({
  declarations: [
    NodeDetailsComponent,
    NodeTreeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AdminModule { }
