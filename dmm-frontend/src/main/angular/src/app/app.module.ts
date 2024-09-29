import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
import { PlayModule } from './play/play.module';
import { AdminModule } from './admin/admin.module';
import { ConfigService } from './services/config.service';
import { SharedModule } from './shared/shared.module';
import { TranslationService } from './services/translation.service';

export function initializeApp(
  configService: ConfigService,
  translationService : TranslationService
) {
  return () => Promise.all(
    [configService.loadConfiguration(),
    translationService.loadConfiguration()]
  );
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    PlayModule,
    AdminModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService, TranslationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
