import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../model/Configuration';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config : Configuration | undefined;

  constructor(private http: HttpClient) {}

  loadConfiguration() : Promise<Configuration> {
    return firstValueFrom(this.http.get<Configuration>('/assets/app-config.json')).then(
      config => this.config = config
    );
  }

  get configuration() {
    return this.config!;
  }
}
