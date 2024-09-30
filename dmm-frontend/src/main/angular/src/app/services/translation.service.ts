import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  messages : any;
  currentLanguage = new BehaviorSubject<string>('IT');
  languageChange$ = this.currentLanguage.asObservable();

  constructor(private http: HttpClient) {}

  loadConfiguration() : Promise<any> {
    return firstValueFrom(this.http.get<any>('/assets/messages.json')).then(
      messages => this.messages = messages
    );
  }

  getMessage(labelId : string) {
    return this.messages[this.currentLanguage.value][labelId];
  }

  getAvailableLanguages() {
    return Object.keys(this.messages);
  }

  setLanguage(languageId : string) {
    this.currentLanguage.next(languageId);
  }
}
