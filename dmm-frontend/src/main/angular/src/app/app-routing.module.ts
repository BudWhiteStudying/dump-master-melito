import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing/landing.component';
import { GameViewComponent } from './play/game-view/game-view.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  {
    path : 'landing',
    component : LandingComponent
  },
  {
    path : 'play',
    component : GameViewComponent
  },
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
