import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslationPipe implements PipeTransform, OnDestroy {
  private languageChangeSubscription: Subscription;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef) {
      this.languageChangeSubscription = this.translationService.languageChange$.subscribe(() => {
        this.cdr.markForCheck();
      });
    }

  transform(labelId : string): unknown {
    return this.translationService.getMessage(labelId);
  }

  ngOnDestroy() {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();  // Clean up the subscription
    }
  }
}
