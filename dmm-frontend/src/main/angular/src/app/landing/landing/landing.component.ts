import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '../../shared/settings/settings.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  
  constructor(public settingsService : SettingsService) {}

}
