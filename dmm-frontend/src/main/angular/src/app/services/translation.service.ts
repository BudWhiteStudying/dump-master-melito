import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  messages : any;
  currentLanguage : 'IT' | 'EN' = 'IT'

  constructor(private http: HttpClient) {}

  loadConfiguration() : Promise<any> {
    return firstValueFrom(this.http.get<any>('/assets/messages.json')).then(
      messages => this.messages = messages
    );
  }

  getMessage(labelId : string) {
    return this.messages[this.currentLanguage][labelId];
  }

  setLanguage(languageId : 'IT' | 'EN') {
    this.currentLanguage = languageId;
  }
}
