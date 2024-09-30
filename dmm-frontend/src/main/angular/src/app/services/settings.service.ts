import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '../shared/settings/settings.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  readonly dialog = inject(MatDialog);

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.debug(`The settings dialog was closed, result is ${result}`);
    });
  }

  constructor() { }
}
