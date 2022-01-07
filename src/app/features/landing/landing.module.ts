import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { landingRoutes } from './landing.routes';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
    NgxShimmerLoadingModule,
  ],
})
export class LandingModule { }
