import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './landing.routes';



@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
  ],
})
export class LandingModule { }
