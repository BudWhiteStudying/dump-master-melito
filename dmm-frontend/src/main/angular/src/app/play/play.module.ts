import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameViewComponent } from './game-view/game-view.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    GameViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PlayModule { }
