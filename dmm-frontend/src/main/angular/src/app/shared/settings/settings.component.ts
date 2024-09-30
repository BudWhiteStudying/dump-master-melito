import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(public translationService : TranslationService){}

  changeLanguage(event : any) {
    this.translationService.setLanguage(event);
  }
}
