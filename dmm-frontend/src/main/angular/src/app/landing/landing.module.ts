import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';

import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from '../shared/settings/settings.component';



@NgModule({
  declarations: [
    LandingComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
