import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(labelId : string): unknown {
    return this.translationService.getMessage(labelId);
  }

}
