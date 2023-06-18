import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { landingRoutes } from './landing.routes';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LandingHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
    MarkdownModule,
  ],
})
export class LandingModule { }
